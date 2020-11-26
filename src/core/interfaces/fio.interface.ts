export interface IFio {
  fullName: string; // Полное, правильно отформатированное ФИО возвращаемый из Dadata
  lastName?: string; // Фамилия
  middleName?: string; // Отчество
  firstName?: string; //  Имя
  isValid?: boolean; // Признка того, что ФИО разобрано или через DATA или в ручную менджером
  gender?: GenderEnum; // Пол (М/Ж), если определить не удалось то поле будет пустым
  object?: IDadataFIO;    // Полный объект адреса из сервиса Dadata
}

export enum GenderEnum {
  MALE = 0,
  FEMALE = 1,
}

export interface IDadataFIO {
  source: 'Срегей владимерович иванов';
  result: 'Иванов Сергей Владимирович';
  resultGenitive: 'Иванова Сергея Владимировича';
  resultDative: 'Иванову Сергею Владимировичу';
  resultAblative: 'Ивановым Сергеем Владимировичем';
  surname: 'Иванов';
  name: 'Сергей';
  patronymic: 'Владимирович';
  gender: 'М';
  qc: 1;
}
