/**
 * Настройки авторизации
 */
export const ssoOptions = {
  url: process.env.PLT_JWT_URL,
  audiences: [],
};

export const GRANTS = {
    /**
     * разрешения на чтение сущностей каталога
     */
    CATALOG_WRITE: 'hrm-core:catalog:write',
    /**
     * разрешения на изменение/создание сущностей каталога
     */
    CATALOG_READ: 'hrm-core:catalog:read',
    /**
     * разрешения на чтение сущности тарифа
     */
    WAGE_READ: "hrm-core:wage:read",
    /**
     * разрешения на изменение/создание сущности тарифа
     */
    WAGE_WRITE: "hrm-core:wage:write",
    /**
     * разрешения на чтение сущностей исполнителя и контракта
     */
    CONTRACT_WRITE: "hrm-core:contract:write",
    /**
     * разрешения на изменение/создание сущностей исполнителя и контракта
     */
    CONTRACT_READ: "hrm-core:contract:read",
}
