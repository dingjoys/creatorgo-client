import { useState, CSSProperties, ReactNode, useEffect } from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { useDebouncedCallback } from 'use-debounce';
import BaseLoading from 'react-spinners/MoonLoader';
import './index.scss';
// import { Checkbox } from '@/component/form/Checkbox';
import useIsMobile from '@/core/useMobile';
export interface IOption {
    key: string | number;
    name: string;
}

export const CategoryOptions: IOption[] = [
    { key: 'defi', name: 'DeFi' },
    { key: 'nft', name: 'NFT' },
    { key: 'dao', name: 'DAO' },
    { key: 'metaverse', name: 'Metaverse' },
    { key: 'social', name: 'Social' },
    { key: 'general', name: 'General' },
];

interface ISelectPros {
    options: {
        name: string;
        options: IOption[];
    }[];
    onSelect?: (keys) => void;
    style?: CSSProperties;
    overlayStyle?: CSSProperties;
    isGroup?: boolean;
    iconUrl?: string;
    placement?: string;
}

export function FilterSelect(props: ISelectPros) {
    const { options, style, iconUrl, onSelect, overlayStyle, placement, isGroup } = props;

    let [activeName, setActiveName] = useState('Filter');
    let [visible, setVisible] = useState(false);
    const [activeKeys, setActiveKeys] = useState([]);
    function localOnSelect(key) {
        // multiple
        let tmp = activeKeys.includes(key)
            ? activeKeys.filter((item) => item !== key)
            : [...activeKeys, key];
        setActiveKeys(tmp);

        onSelect(
            isGroup
                ? tmp.reduce((obj, item) => {
                      const [key, value] = item.split('__');
                      if (!obj[key]) obj[key] = [];
                      obj[key].push(value);
                      return obj;
                  }, {})
                : tmp.map((t) => {
                      return t.split('__')[1];
                  }),
        );
    }
    const menu = (
        <div className="filter-select-overlay-content">
            {options?.map((option, index) => {
                return (
                    <div
                        className="filter-select-overlay-content-item"
                        key={`filter-wrapper-${option.name}`}
                    >
                        <h6 className="filter-select-overlay-content-title">{option.name}</h6>
                        <div
                            className={
                                index === 0
                                    ? 'filter-select-overlay-content-menu no-border'
                                    : 'filter-select-overlay-content-menu '
                            }
                        >
                            <Menu key={`filter-option-${option.name}`}>
                                {option.options.map((e) => {
                                    return (
                                        <MenuItem key={`${option.name}__${e.key}`}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '9px',
                                                }}
                                                onClick={() => {
                                                    localOnSelect(`${option.name}__${e.key}`);
                                                }}
                                            >
                                                {/* <Checkbox
                                                    size="18px"
                                                    shape="square"
                                                    value={activeKeys.includes(
                                                        `${option.name}__${e.key}`,
                                                    )}
                                                /> */}
                                                <span
                                                    style={{
                                                        flex: 1,
                                                    }}
                                                    className={`${
                                                        activeKeys.includes(
                                                            `${option.name}__${e.key}`,
                                                        )
                                                            ? 'active-text text'
                                                            : 'text'
                                                    }`}
                                                >
                                                    {e.name}
                                                </span>
                                            </div>
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    function onVisibleChange(visible) {
        setVisible(visible);
    }
    return (
        <Dropdown
            trigger={['click']}
            // @ts-ignore
            placement={placement ?? 'bottomLeft'}
            overlayStyle={overlayStyle ? overlayStyle : {}}
            overlayClassName="sub-home-drop"
            visible={visible}
            onVisibleChange={onVisibleChange}
            overlay={menu}
            animation="slide-up"
        >
            <span className="sub-home-select" style={{ ...style }}>
                {iconUrl && <img src={iconUrl} alt=""></img>}
                {activeName}
                {activeKeys?.length ? (
                    <span className="sub-home-select-len">{activeKeys.length}</span>
                ) : null}
            </span>
        </Dropdown>
    );
}

export function MenuDropdown(props: {
    options: {
        body: string | ReactNode;
    }[];
    overlayStyle?: CSSProperties;
    body: string | ReactNode;
    header?: string;
    defaultVisible?: boolean;
    placement?: string;
}) {
    const { header, options, body, overlayStyle, defaultVisible, placement } = props;

    let [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(!!defaultVisible);
    }, [defaultVisible]);

    function onVisibleChange(visible) {
        setVisible(visible);
    }
    return (
        <Dropdown
            trigger={['click']}
            // @ts-ignore
            placement={placement ?? 'bottomLeft'}
            overlayClassName="menu-dropdown"
            overlayStyle={overlayStyle ? overlayStyle : {}}
            visible={visible}
            onVisibleChange={onVisibleChange}
            overlay={
                <div>
                    {header && <div className="menu-dropdown-header">{header}</div>}
                    <Menu>
                        {options.map((option, i) => {
                            return (
                                <MenuItem
                                    className="menu-dropdown-item"
                                    key={`menu-dropdown__${i}`}
                                    onClick={() => {
                                        setVisible(false);
                                    }}
                                >
                                    {option.body}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </div>
            }
            animation="slide-up"
        >
            <span> {body}</span>
        </Dropdown>
    );
}

export function Loading() {
    return <BaseLoading className="loading" size={30} color="#ffffff" />;
}

export function SearchInput(props: {
    onChange?;
    onSearchClick?;
    className?;
    defaultValue?;
    style?;
    placeholder?;
}) {
    const { onChange, onSearchClick, className, defaultValue, style, placeholder } = props;
    const [val, setVal] = useState(defaultValue || '');
    const { isMobile } = useIsMobile();
    const foo = useDebouncedCallback((keyword) => {
        onChange && onChange(keyword);
    }, 500);

    return (
        <div
            className={`sub-home-search ${val ? 'highlight' : ''} ${className} ${
                isMobile ? 'is-mobile' : ''
            }`}
            style={style || {}}
        >
            <img
                src="https://oss.metopia.xyz/search.svg"
                className="icon"
                alt="Search"
                style={{
                    cursor: 'pointer',
                    filter: 'brightness(0.6)',
                }}
                onClick={() => {
                    foo(val);
                    onSearchClick?.();
                }}
            />
            <input
                placeholder={placeholder || 'Search'}
                id={'search-input'}
                onChange={(e) => {
                    foo(e.target.value);
                    setVal(e.target.value);
                }}
                value={val}
                onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                        foo(val);
                    }
                }}
            />
            <img
                className="sub-home-search-suffix"
                alt=""
                src="https://metopia.oss-cn-hongkong.aliyuncs.com/imgs/basefun/search-suffix.png"
            />
        </div>
    );
}

export default SearchInput;
