import { ApplicationProperties } from './application.properties';

export class PathAPI {

    // get categories
    public static GET_CATEGORIES = ApplicationProperties.PATH_API.concat('Category/GetCategoryById');
    // public static GET_CATEGORIES = ApplicationProperties.PATH_API.concat('api/v1/Category/GetCategoryById');
    // public static GET_CATEGORIES = ApplicationProperties.PATH_API.concat('category/get-category-by-id');
    public static GET_SHOP = ApplicationProperties.PATH_API.concat('api/v1/Category/GetShopById');
    // public static GET_SHOP = ApplicationProperties.PATH_API.concat('Category/GetShopById');
    public static GET_LOGIN = ApplicationProperties.PATH_API.concat('User');
// }
}
