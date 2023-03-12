import React from 'react';
import { createUltimatePagination, ITEM_TYPES, PaginationComponentProps } from 'react-ultimate-pagination';
import { Pagination } from 'react-bootstrap';


const WrapperComponent = ({ children }: any) => (
  <Pagination>{children}</Pagination>
);


const Page = ({ value, isActive, onClick }: PaginationComponentProps) => (
  <Pagination.Item active={isActive} onClick={onClick}>
    {value}
  </Pagination.Item>
);

const Ellipsis = ({ onClick }: PaginationComponentProps) => (
  <Pagination.Ellipsis onClick={onClick} />
);


const FirstPageLink = ({ onClick }: PaginationComponentProps) => (
  <Pagination.First onClick={onClick} />
);


const PreviousPageLink = ({ onClick }: PaginationComponentProps) => (
  <Pagination.Prev onClick={onClick} />
);

const NextPageLink = ({ onClick }: PaginationComponentProps) => (
  <Pagination.Next onClick={onClick} />
);

const LastPageLink = ({ onClick }: PaginationComponentProps) => (
  <Pagination.Last onClick={onClick} />
);

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink,
};

const UltimatePaginationBootstrap5 = createUltimatePagination({ itemTypeToComponent, WrapperComponent });

export default UltimatePaginationBootstrap5;