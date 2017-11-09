import {is} from 'gm-util';

// /a/b 匹配 /a/b 和  /a/b/c  不匹配 /a/b_a
const isPathMatch = (pathname, link) => {
    const pArr = pathname.split('/'), lArr = link.split('/');
    return _.filter(lArr, (v, i) => pArr.indexOf(v) === i).length === lArr.length;
};

function setTitle(title) {
    window.document.title = title;

    if (!is.weixin()) {
        return;
    }

    const iframe = window.document.createElement('iframe');
    iframe.src = '../abcdefg.pgn';

    const listener = () => {
        setTimeout(() => {
            iframe.removeEventListener('load', listener);
            setTimeout(() => {
                window.document.body.removeChild(iframe);
            }, 0);
        }, 0);
    };
    iframe.addEventListener('load', listener);
    window.document.body.appendChild(iframe);
}

export {
    isPathMatch,
    setTitle
};