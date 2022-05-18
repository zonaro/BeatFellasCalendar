import {
    createApp
} from 'vue'
import App from './App.vue'

const app = createApp(App)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.directive("fitText", async(el, binding) => {
    const byHeight = binding.value.byHeight !== undefined ? binding.value.byHeight : false;
    const setLineHeight = binding.value.setLineHeight !== undefined ? binding.value.setLineHeight : false;
    const withMarginTop = binding.value.withMarginTop !== undefined ? binding.value.withMarginTop : false;
    const delay = binding.value.delay !== undefined ? binding.value.delay : 100;
    let fontSize = 0;

    await sleep(delay);

    el.parentElement.style.position = "relative";
    el.style.whiteSpace = "nowrap";
    el.style.position = "absolute";
    el.style.fontSize = "0px";

    if (byHeight) {
        const limit = el.parentElement.clientHeight;

        while (el.clientHeight < limit) {
            fontSize = parseInt(window.getComputedStyle(el).fontSize) + 1;
            el.style.fontSize = fontSize + "px";
        }
    } else {
        const limit = el.parentElement.clientWidth;

        while (el.clientWidth < limit) {
            fontSize = parseInt(window.getComputedStyle(el).fontSize) + 1;
            el.style.fontSize = fontSize + "px";
        }
    }

    fontSize = parseInt(window.getComputedStyle(el).fontSize) - 1;
    el.style.fontSize = fontSize + "px";
    el.style.removeProperty('position');
    el.parentElement.removeAttribute("style");

    if (withMarginTop)
        el.style.marginTop = (-fontSize / 2) + "px"

    if (setLineHeight)
        el.style.lineHeight = fontSize + "px";
});

app.directive("fitList", async(el, binding) => {
    const numberOfItems = binding.value.numberOfItems !== undefined ? binding.value.numberOfItems : 1;
    const delay = binding.value.delay !== undefined ? binding.value.delay : 100;
    let fontSize = 0,
        dayWidth = 0,
        eventFontSize = {
            day: 0,
            type: 0,
            title: 0,
            info: 0
        };

    await sleep(delay);

    el.parentElement.classList.add('flex-grow-1');
    el.style.position = 'relative';
    const limit = el.parentElement.clientHeight / numberOfItems;
    const limitWidth = el.parentElement.clientWidth;

    el.querySelectorAll('li').forEach((li) => {
        li.style.position = 'absolute';
        li.style.width = 'auto';
        li.querySelectorAll('span').forEach((span) => {
            span.style.removeProperty('width');
            span.style.whiteSpace = "nowrap";
            span.style.fontSize = "0px";
            span.style.lineHeight = "0px";
        });

        while (li.clientHeight < (limit - 8) && li.clientWidth <= limitWidth) {
            li.querySelectorAll('span').forEach((span) => {
                if (span.className.includes('event-day'))
                    fontSize = parseInt(window.getComputedStyle(span).fontSize) + 13;
                else if (span.className.includes('event-type'))
                    fontSize = parseInt(window.getComputedStyle(span).fontSize) + 4;
                else if (span.className.includes('event-title'))
                    fontSize = parseInt(window.getComputedStyle(span).fontSize) + 8;
                else if (span.className.includes('event-info'))
                    fontSize = parseInt(window.getComputedStyle(span).fontSize) + 5;
                else
                    fontSize = parseInt(window.getComputedStyle(span).fontSize) + 1;

                span.style.fontSize = fontSize + "px";
                span.style.lineHeight = fontSize + "px";
            });
        }

        li.querySelectorAll('span').forEach((span) => {
            if (span.className.includes('event-day'))
                fontSize = parseInt(window.getComputedStyle(span).fontSize) - 13;
            else if (span.className.includes('event-type'))
                fontSize = parseInt(window.getComputedStyle(span).fontSize) - 4;
            else if (span.className.includes('event-title'))
                fontSize = parseInt(window.getComputedStyle(span).fontSize) - 8;
            else if (span.className.includes('event-info'))
                fontSize = parseInt(window.getComputedStyle(span).fontSize) - 5;
            else
                fontSize = parseInt(window.getComputedStyle(span).fontSize) - 1;

            span.style.fontSize = fontSize + "px";
            span.style.lineHeight = fontSize + "px";
        });
        li.style.removeProperty('position');
        li.style.removeProperty('width');
    });

    el.style.removeProperty('position');

    el.querySelectorAll('li').forEach((li) => {
        li.querySelectorAll('span').forEach((span) => {
            if (span.className.includes('event-day') && parseInt(window.getComputedStyle(span).fontSize) < eventFontSize.day || eventFontSize.day == 0)
                eventFontSize.day = parseInt(window.getComputedStyle(span).fontSize);
            else if (span.className.includes('event-type') && parseInt(window.getComputedStyle(span).fontSize) < eventFontSize.type || eventFontSize.type == 0)
                eventFontSize.type = parseInt(window.getComputedStyle(span).fontSize);
            else if (span.className.includes('event-title') && parseInt(window.getComputedStyle(span).fontSize) < eventFontSize.title || eventFontSize.title == 0)
                eventFontSize.title = parseInt(window.getComputedStyle(span).fontSize);
            else if (span.className.includes('event-info') && parseInt(window.getComputedStyle(span).fontSize) < eventFontSize.info || eventFontSize.info == 0)
                eventFontSize.info = parseInt(window.getComputedStyle(span).fontSize);
        });
    });

    el.querySelectorAll('li').forEach((li) => {
        li.querySelectorAll('span').forEach((span) => {
            if (span.className.includes('event-day')) {
                span.style.fontSize = eventFontSize.day + "px";
                span.style.lineHeight = eventFontSize.day + "px";
            } else if (span.className.includes('event-type')) {
                span.style.fontSize = eventFontSize.type + "px";
                span.style.lineHeight = eventFontSize.type + "px";
            } else if (span.className.includes('event-title')) {
                span.style.fontSize = eventFontSize.title + "px";
                span.style.lineHeight = eventFontSize.title + "px";
            } else if (span.className.includes('event-info')) {
                span.style.fontSize = eventFontSize.info + "px";
                span.style.lineHeight = eventFontSize.info + "px";
            }
        });
    });

    el.querySelectorAll('li').forEach((li) => {
        li.querySelectorAll('.event-day').forEach((eventDay) => {
            if (eventDay.clientWidth > dayWidth)
                dayWidth = eventDay.clientWidth;
        });
    });

    el.querySelectorAll('li').forEach((li) => {
        li.querySelectorAll('.event-day').forEach((eventDay) => {
            eventDay.style.width = dayWidth + 'px';
        });
    });

    // fontSize = 0;

    // const listItemHeight = el.querySelector('li').clientHeight + 8,
    //     listItemCount = el.querySelectorAll('li').length,
    //     listHeight = listItemHeight * listItemCount - 8;

    // let aside = document.querySelector('aside span');
    // aside.parentElement.style.height = listHeight + 'px'
    // aside.style.fontSize = fontSize + 'px';
    // aside.style.lineHeight = fontSize + 'px';
    // aside.style.position = 'absolute';

    // while (aside.clientHeight < listHeight) {
    //     fontSize = parseInt(window.getComputedStyle(aside).fontSize) + 1;
    //     aside.style.fontSize = fontSize + "px";
    //     aside.style.lineHeight = fontSize + "px";
    // }

    // fontSize = parseInt(window.getComputedStyle(aside).fontSize) - 1;
    // aside.style.fontSize = fontSize + "px";
    // aside.style.lineHeight = fontSize + "px";
    // aside.style.removeProperty('position');
    // aside.parentElement.style.removeProperty('height');

    el.parentElement.classList.remove('flex-grow-1');
})

app.mount('#app')