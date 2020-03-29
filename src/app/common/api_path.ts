import { ApplicationProperties } from './application.properties';

export class PathAPI {
    public static GET_CATEGORIES = ApplicationProperties.PATH_API.concat('api/v1/Category/GetCategoryById');
    public static GET_SHOP = ApplicationProperties.PATH_API.concat('api/v1/Category/GetShopById');
    public static LOGIN = ApplicationProperties.PATH_API.concat('api/v1/auth/login');
    public static LOGOUT = ApplicationProperties.PATH_API.concat('api/v1/auth/logout');
    public static GET_GERSHOPEEPRODUCT = ApplicationProperties.PATH_API.concat('api/v1/ProductManager/GetShopeeProduct');
}
