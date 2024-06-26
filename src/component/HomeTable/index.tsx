import EmptyDataHint from '@/component/EmptyDataHint';
import { ReactComponent as IconArrowDown } from '@/component/icons/svg/arrow-down.svg';
import { ReactComponent as IconArrowRight } from '@/component/icons/svg/arrow-right.svg';
import { ReactComponent as IconDoubleArrow } from '@/component/icons/svg/double-arrow.svg';
import { HomeTableLoader } from '@/component/loadingLoader';
import { ReactNode, useMemo, useReducer, useState } from 'react';
import './index.scss';
import useIsMobile from '@/core/useMobile';
interface tableItem {
    [key: string]: any;
}
interface columnItem {
    label: string | ReactNode;
    prop: string;
    align?: 'left' | 'center' | 'right';
    sticky?: boolean;
    stickyPosition?: {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    };
    renderDom?: (
        data: tableItem,
        index: number,
        prop: string,
        rowIndex: number,
    ) => ReactNode | string | number | boolean;
    tdClassName?: string;
    width?: string;
    sort?: boolean;

    sortOrder?: 'desc' | 'asc'; // asc-升序， desc-降序， 默认desc
    onTdClick?: (row: tableItem, rowIndex: number) => void;
    hidden?: boolean;
}
interface Props {
    data: tableItem[];
    columns: columnItem[];
    onSort?: (sortField: string, sortedValue: string) => void;
    onRowClick?: (row: tableItem, e) => void;
    className?: string;
    tdClassName?: string;
    emptyText?: string;
    otherContent?: string | ReactNode;
    trClassName?: (row: tableItem, rowIndex: number) => string | string;
    trDisabled?: (row: tableItem, rowIndex: number) => boolean;
    currentSortProp?: string;
    isLoading?: boolean;
    isExpandTable?: boolean;
    expandKey?: string;
    loaderHeight?: number;
    loaderCount?: number;
    hideHead?: boolean;
    isStickyHeader?: boolean;
    stickyTop?: string;
    stickyBgColor?: string;
    isExpandTr?: boolean;
    renderExpandNode?: (row: tableItem, isExpand?: boolean) => ReactNode | string | null;
}

function HomeTable({
    isExpandTable = false, // 开启全table折叠
    expandKey, // 展开折叠的父级key，比如parentId，会被设置在data-expand-key中
    isLoading,
    loaderHeight,
    loaderCount,
    className,
    columns,
    tdClassName,
    trClassName,
    trDisabled,
    data,
    onSort,
    onRowClick,
    emptyText,
    currentSortProp,
    hideHead,
    isStickyHeader,
    stickyTop,
    stickyBgColor,
    isExpandTr,
    renderExpandNode,
    otherContent,
}: Props) {
    const currentSortField = currentSortProp ?? '';
    const { isMobile } = useIsMobile();
    const [showExpandRows, setShowExpandRows] = useState([]); // expandKey

    const expandTableData = useMemo(() => {
        if (!isExpandTable) return data;
        if (!expandKey) {
            console.error('need expanedkey');
            return data;
        }
        return data
            .sort((a, b) => {
                if (a[expandKey] === null && b[expandKey] !== null) {
                    return -1;
                } else if (a[expandKey] == null && b[expandKey] == null) {
                    return 0;
                } else {
                    return 1;
                }
            })
            .reduce((list, current) => {
                if (current[expandKey] === null) {
                    list.push({ key: current.id, children: [current] });
                } else {
                    const target = list.find(
                        (item) => String(item.key) == String(current[expandKey]),
                    );
                    if (target) {
                        target.children.push(current);
                    } else {
                        list.push({ key: current[expandKey], children: [current] });
                    }
                }

                return list;
            }, []);
    }, [data, expandKey, isExpandTable]);

    const [expandRowMap, setExpandRowMap] = useState({});

    return (
        <table
            className={`home-table-wrapper ${className ?? ''} ${
                isMobile ? 'home-table-is-mobile' : ''
            }`}
        >
            <colgroup>
                {columns.map((item, index) => {
                    return <col width={item.width} key={'home-table-colgroup_' + index}></col>;
                })}
                {isExpandTr ? <col width={48} key={'home-table-colgroup_expand'}></col> : null}
            </colgroup>
            <thead style={hideHead || !data.length ? { display: 'none' } : null}>
                <tr
                    className={isStickyHeader ? 'home-table-header-sticky' : ''}
                    style={
                        isStickyHeader
                            ? {
                                  top: stickyTop ?? '80px',
                                  background: stickyBgColor ?? 'transparent',
                              }
                            : {}
                    }
                >
                    {columns?.map((item) => {
                        const columnStyles = item.sticky
                            ? {
                                  position: 'sticky',
                                  ...(item.stickyPosition || {}),
                              }
                            : {};
                        return (
                            <th
                                className={`home-table-th ${item.tdClassName ?? ''} ${
                                    item.align ? 'text-' + item.align : ''
                                }`}
                                key={item.prop}
                                style={{ width: item?.width ?? 'auto', ...columnStyles }}
                            >
                                {item.label}
                                {item.sort && (
                                    <IconArrowDown
                                        fill={currentSortField === item.prop ? '#fff' : '#7D809A'}
                                        onClick={() => {
                                            onSort &&
                                                onSort(
                                                    item.prop,
                                                    item.sortOrder === 'asc' ? 'desc' : 'asc',
                                                );
                                        }}
                                        className={`sort-icon ${
                                            item.sortOrder === 'asc' ? 'asc' : 'desc'
                                        }`}
                                    />
                                )}
                            </th>
                        );
                    })}
                    {isExpandTr ? (
                        <th
                            key={`expand-th`}
                            className={`home-table-th home-table-th-expand-td`}
                        ></th>
                    ) : null}
                </tr>
            </thead>
            <tbody>
                {data?.length ? (
                    <>
                        {isExpandTable
                            ? expandTableData.map((group) => {
                                  return (
                                      <>
                                          {(!showExpandRows.includes(group.key)
                                              ? group.children.slice(0, 1)
                                              : group.children
                                          ).map((row, rowIndex) => {
                                              return (
                                                  <tr
                                                      className={
                                                          'home-table-tr' +
                                                          (onRowClick ? ' clickable' : '') +
                                                          (trClassName
                                                              ? ` ${
                                                                    typeof trClassName ===
                                                                    'function'
                                                                        ? trClassName(row, rowIndex)
                                                                        : trClassName
                                                                }`
                                                              : '')
                                                      }
                                                      onClick={(e) => {
                                                          onRowClick && onRowClick(row, e);
                                                      }}
                                                      key={`${rowIndex}-tr`}
                                                  >
                                                      {columns?.map((item, i) => {
                                                          const columnStyles = item.sticky
                                                              ? {
                                                                    position: 'sticky',
                                                                    ...(item.stickyPosition || {}),
                                                                }
                                                              : {};
                                                          return (
                                                              <td
                                                                  key={`${item.prop}-${i}`}
                                                                  onClick={() => {
                                                                      item.onTdClick &&
                                                                          item.onTdClick(
                                                                              row,
                                                                              rowIndex,
                                                                          );
                                                                  }}
                                                                  className={`home-table-td ${
                                                                      tdClassName ?? ''
                                                                  } ${item.tdClassName ?? ''} ${
                                                                      item.onTdClick
                                                                          ? 'cursor-pointer'
                                                                          : ''
                                                                  } ${
                                                                      item.align
                                                                          ? 'text-' + item.align
                                                                          : ''
                                                                  }`}
                                                                  style={columnStyles}
                                                              >
                                                                  {item.renderDom
                                                                      ? item.renderDom(
                                                                            row,
                                                                            i,
                                                                            item.prop,
                                                                            rowIndex,
                                                                        )
                                                                      : row[item.prop]}
                                                              </td>
                                                          );
                                                      })}
                                                  </tr>
                                              );
                                          })}
                                          {group.children.length > 1 && (
                                              <tr className="home-table-expand-tr">
                                                  <td
                                                      colSpan={
                                                          isExpandTr
                                                              ? columns.length + 1
                                                              : columns.length
                                                      }
                                                      className="home-table-expand-td"
                                                      onClick={() => {
                                                          if (showExpandRows.includes(group.key)) {
                                                              setShowExpandRows(
                                                                  showExpandRows.filter(
                                                                      (key) => key !== group.key,
                                                                  ),
                                                              );
                                                          } else {
                                                              setShowExpandRows([
                                                                  ...showExpandRows,
                                                                  group.key,
                                                              ]);
                                                          }
                                                      }}
                                                  >
                                                      <div className="home-table-expand-td-box">
                                                          {showExpandRows.includes(group.key)
                                                              ? ''
                                                              : `${group.children.length - 1} of ${
                                                                    group.children.length
                                                                }`}
                                                          <IconArrowRight
                                                              className={`home-table-expand-td-arrow ${
                                                                  showExpandRows.includes(group.key)
                                                                      ? 'expanded'
                                                                      : ''
                                                              }`}
                                                          />
                                                      </div>
                                                  </td>
                                              </tr>
                                          )}
                                      </>
                                  );
                              })
                            : data?.map((row, rowIndex) => {
                                  return (
                                      <>
                                          <tr
                                              className={
                                                  'home-table-tr' +
                                                  (onRowClick ? ' clickable' : '') +
                                                  (trClassName
                                                      ? ` ${
                                                            typeof trClassName === 'function'
                                                                ? trClassName(row, rowIndex)
                                                                : trClassName
                                                        }`
                                                      : '') +
                                                  (trDisabled && trDisabled(row, rowIndex)
                                                      ? ' home-table-tr-disabled'
                                                      : '')
                                              }
                                              onClick={(e) => {
                                                  onRowClick && onRowClick(row, e);
                                              }}
                                              key={`${rowIndex}-tr`}
                                          >
                                              {columns?.map((item, i) => {
                                                  const columnStyles = item.sticky
                                                      ? {
                                                            position: 'sticky',
                                                            ...(item.stickyPosition || {}),
                                                        }
                                                      : {};
                                                  return (
                                                      <td
                                                          key={`${item.prop}-${i}`}
                                                          onClick={() => {
                                                              item.onTdClick &&
                                                                  item.onTdClick(row, rowIndex);
                                                          }}
                                                          className={`home-table-td ${
                                                              tdClassName ?? ''
                                                          } ${item.tdClassName ?? ''} ${
                                                              item.onTdClick ? 'cursor-pointer' : ''
                                                          } ${
                                                              item.align ? 'text-' + item.align : ''
                                                          }`}
                                                          style={columnStyles}
                                                      >
                                                          {item.renderDom
                                                              ? item.renderDom(
                                                                    row,
                                                                    i,
                                                                    item.prop,
                                                                    rowIndex,
                                                                )
                                                              : row[item.prop]}
                                                      </td>
                                                  );
                                              })}
                                              {isExpandTr ? (
                                                  <td
                                                      key={`expand-td`}
                                                      className={`home-table-td home-table-td-expand-td`}
                                                  >
                                                      {renderExpandNode?.(row) ? (
                                                          <IconDoubleArrow
                                                              style={{
                                                                  cursor: 'pointer',
                                                              }}
                                                              onClick={() => {
                                                                  expandRowMap[rowIndex] =
                                                                      !expandRowMap[rowIndex];
                                                                  setExpandRowMap({
                                                                      ...expandRowMap,
                                                                  });
                                                                  //   switchRowExpand(row);
                                                              }}
                                                          />
                                                      ) : null}
                                                  </td>
                                              ) : null}
                                          </tr>
                                          {isExpandTr && renderExpandNode?.(row) ? (
                                              <tr
                                                  className={`home-table-expand-tr ${
                                                      expandRowMap[rowIndex] ? 'show-expand' : ''
                                                  }`}
                                              >
                                                  <td
                                                      colSpan={
                                                          isExpandTr
                                                              ? columns.length + 1
                                                              : columns.length
                                                      }
                                                      className="home-table-expand-td"
                                                  >
                                                      {renderExpandNode(
                                                          row,
                                                          expandRowMap[rowIndex],
                                                      )}
                                                  </td>
                                              </tr>
                                          ) : null}
                                      </>
                                  );
                              })}
                        {isLoading && (
                            <tr>
                                <td colSpan={isExpandTr ? columns.length + 1 : columns.length}>
                                    <HomeTableLoader
                                        height={loaderHeight || 74}
                                        count={loaderCount || 3}
                                    />
                                </td>
                            </tr>
                        )}
                    </>
                ) : (
                    <tr>
                        <td colSpan={isExpandTr ? columns.length + 1 : columns.length}>
                            {isLoading ? (
                                <HomeTableLoader
                                    height={loaderHeight || 74}
                                    count={loaderCount || 3}
                                />
                            ) : (
                                <EmptyDataHint
                                    content={emptyText || 'No results found.'}
                                    otherContent={otherContent || null}
                                    size={'75px'}
                                />
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default HomeTable;
