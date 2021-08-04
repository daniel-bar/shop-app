import { IUserInterface } from './user.model';
import { IPaymentInterface } from './payment.model';
import { IProductInterface } from './product.model';
import { ISelectDataItem } from './shared/select-data';

export interface IResponse {
  readonly success: boolean;
  readonly message: string;
}

export interface IAuthResponse extends IResponse {
  readonly data?: IUserInterface;
}

export interface IEditUserDetailsResponse extends IResponse {
  readonly data?: IUserInterface;
}

export interface IPaymentResponse extends IResponse {
  readonly data?: IPaymentInterface;
}

export interface IAddProductResponse extends IResponse {
  readonly data?: IProductInterface;
}

export interface IGetProductResponse extends IResponse {
  readonly data?: IProductInterface;
}

export interface IGetProductsResponse extends IResponse {
  readonly data?: IProductInterface[];
}

export interface IDeleteProductResponse extends IResponse {}

export interface IContactResponse extends IResponse {}

export interface IGetCategoriesResponse extends IResponse {
  readonly data?: ISelectDataItem[];
}

export interface IGetGendersResponse extends IResponse {
  readonly data?: ISelectDataItem[];
}

export interface IGetTopicsResponse extends IResponse {
  readonly data?: ISelectDataItem[];
}
