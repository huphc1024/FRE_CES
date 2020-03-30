import { ApplicationProperties } from './application.properties';

export class PathAPI {
    public static GET_CATEGORIES = ApplicationProperties.PATH_API.concat('api/v1/Category/GetCategoryById');
    public static GET_SHOP = ApplicationProperties.PATH_API.concat('api/v1/Category/GetShopById');
    public static LOGIN = ApplicationProperties.PATH_API.concat('api/v1/auth/login');
    public static LOGOUT = ApplicationProperties.PATH_API.concat('api/v1/auth/logout');
    public static GET_SHOPEE_PRODUCT = ApplicationProperties.PATH_API.concat('api/v1/ProductManager/GetShopeeProduct');
    public static GET_TIKI_PRODUCT = ApplicationProperties.PATH_API.concat('api/v1/ProductManager/GetTikiProduct');
    public static GET_SENDO_PRODUCT = ApplicationProperties.PATH_API.concat('api/v1/ProductManager/GetSendoProduct');
    public static GET_SHOPEE_PRODUCT_DETAIL = ApplicationProperties.PATH_API.concat('api/v1/ProductManager/GetShopeeProductDetail');
}
