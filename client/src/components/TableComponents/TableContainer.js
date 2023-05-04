import React, { Fragment, useEffect, useState } from 'react';
import {
  useTable,
  useSortBy, 
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table,Button, Input } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  ///Setting pagination width
  const [paginationWidth,setPaginationWidth]=useState("100%")
  function calcTableWidth() {
    const table = document.getElementById("applicantTable");
    if(table){
      setPaginationWidth(table.offsetWidth + "px" || "100%");
    }
  }
  window.addEventListener("resize", calcTableWidth);
  useEffect(()=>{
    const table = document.getElementById("applicantTable");
    setPaginationWidth(table.offsetWidth + "px")
  },[])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? <i style={{ paddingLeft: "10px" }} className="fa fa-sort-down" title="sorted in descending order"></i> : <i className="fa fa-sort-up" style={{ paddingLeft: "10px" }} title="sorted in ascending order"></i>) : <i className="fa fa-sort" style={{ paddingLeft: "10px" }} title="sort"></i>;
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <div className='border border-2 overflow-auto '>
        {/* Table for the applicantList */}
        <Table id="applicantTable" bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className='' {...column.getHeaderProps()}>
                    <div className='d-flex align-items-center' {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {column.disableSortBy ? "" : generateSortingIndicator(column)}
                    </div>
                    {column.disableFilters ? <Input style={{ visibility: "hidden", width: "10px" }} /> : <Filter column={column} />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
        {/* pagination for the applicantList */}
        <div style={{width:`${paginationWidth}`} } className='border border-2 '>

          <div style={{ textAlign: 'center', display: "flex", justifyContent: "space-between", width: "100%"}}>
            <div >
              <Button
                color='primary'
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {'<<'}
              </Button>
              <Button
                color='primary'
                onClick={previousPage}
                disabled={!canPreviousPage}
              >
                {'<'}
              </Button>
            </div>
            <div style={{ marginTop: 7 }}>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </div>
            <span>
              <Input
                type='number'
                min={1}
                style={{ width: 70 }}
                max={pageOptions.length}
                defaultValue={pageIndex + 1}
                onChange={onChangeInInput}
              />
            </span>
            <span>
              <Input
                type='select'
                value={pageSize}
                onChange={onChangeInSelect}
              >

                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Input>
            </span>
            <span>
              <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
                {'>'}
              </Button>
              <Button
                color='primary'
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {'>>'}
              </Button>
            </span>
          </div>
        </div>
      </div>
      {/* start design? */}
      
    </Fragment>
  );
};

export default TableContainer;
