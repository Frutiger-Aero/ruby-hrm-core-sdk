export const PACKAGE_NAME = 'hrm.core';

export const ERRORS = {
  EXECUTOR_NOT_FOUND: 'исполнитель не найден',
  TARIFF_NOT_FOUND: 'тариф не найден',
  SPECIALIZATION_NOT_FOUND: 'специализация не найдена',
  CITIZENSHIP_NOT_FOUND: 'передаваемое гражданство не поддерживается',
};

/**
 * SSO гранты для работы c сервисом
 */
export const GRANTS = {
  /**
   * можно создавать исполнителя
   */
  EXECUTOR_CREATE: 'hrm:core:executor:create',

  /**
   * можно получать исполнителя
   */
  EXECUTOR_GET: 'hrm:core:executor:get',

  /**
   * можно изменять исполнителя
   */
  EXECUTOR_UPDATE: 'hrm:core:executor:update',

  /**
   * можно отключать исполнителя
   */
  EXECUTOR_DISABLE: 'hrm:core:executor:disable',

  /**
   * можно получать список изменений профиля исполнителя
   */
  GET_HISTORY_PROFILE: 'hrm:core:history-profile:get',
};

export const APP_PROPS = {};
