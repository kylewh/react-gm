import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { isPathMatch, setTitle } from './util';

class Breadcrumb extends React.Component {
    componentDidUpdate() {
        const { pathname, name } = this.props;

        const breadCrumb = this.nav2BreadCrumb(pathname);
        const breadCrumbLen = breadCrumb.length;
        const subTitle = breadCrumbLen >= 1 ? breadCrumb[breadCrumbLen -1].text : '';

        let docTitle = '';

        if( subTitle && name ) {
            docTitle = subTitle + '|' + name;
        }else if (name) {
            docTitle = name;
        }else if( subTitle ) {
            docTitle = subTitle;
        }

        console.log('docTitle', docTitle);
        setTitle(docTitle);
    }

    nav2BreadCrumb() {
        const { breadcrumbs, pathname, navConfig } = this.props;

        const isHome = pathname === '/home';
        let result = [];

        if (isHome) {
            result = [{
                text: '主页',
                link: '/home'
            }];
        } else {
            console.log('222222', breadcrumbs, pathname, isHome, result);
            _.forEach(navConfig, value => {
                if( _.startsWith(pathname, value.link) ) {
                    result.push( {text: value.name, link: value.link} );
                    _.forEach( value.sub, val => {
                        _.forEach( val.sub, v => {
                            if( isPathMatch(pathname, v.link) ) {
                                result.push({text: val.name, link: val.link});
                                result.push({text: v.name, link: v.link});
                            }
                        });
                    });
                }
            });

            // 面包屑
            // https://code.guanmai.cn/front-end/think/issues/24
            _.forEach(breadcrumbs, v => {
                console.log('面包屑', v);
                if( _.isString(v)) {
                    result.push({text: v});
                }else {
                    result.push({text: v.name, link: v.link || pathname});
                }
            });
        }
        return result;
    }

    render() {
        const data = this.nav2BreadCrumb();

        if (!data || data.length === 0) {
            return <div className="gm-framework-breadcrumb-default"/>;
        }

        return (
            <ol className="gm-framework-breadcrumb-default breadcrumb">
                {_.map(data.slice(0, -1), (v, i) => (
                    <li key={i + '_' + v.link}>
                        <a
                            href={"#" + v.link}
                            className="gm-framework-breadcrumb-default-link"
                        >{v.text}</a>
                    </li>
                ))}
                <li className="active">{data.slice(-1)[0].text}</li>
            </ol>
        );
    }
}

Breadcrumb.propTypes = {
    breadcrumbs: PropTypes.array,
    pathname: PropTypes.string,
    navConfig: PropTypes.array,
    name: PropTypes.string
};

export default Breadcrumb;