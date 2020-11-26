export interface IAddress {
  value: string;              // Человекочитаемый адрес возвращаемый из Dadata
  unrestrictedValue: string;  // Полный адрес, включающим индекс и район из Dadata
  object?: IAddressObject;    // Полный объект адреса из сервиса Dadata
  detail?: IAddressDetail;    // Внутренняя дополнительная детализация адреса
  coordinates?: IPoint;       // Координаты адреса, берется из сервиса Dadata
  metro?: IMetro[];           // Массив станций метро, берется из сервиса Dadata
}

// Структура для координат
export interface IPoint {
  readonly lat: number;  // Широта
  readonly lng: number;  // Долгота
}

// Структура для станций метро, дистанции до адреса а так же ветки метро
export interface IMetro {
  readonly distance: number;  // Дробное число в км от адреса до станции метро
  readonly line: string;      // Название ветки метро
  readonly name: string;      // Название станции метро
}

// Стурктура доя внутренней детализации
export interface IAddressDetail {
  readonly code?: string;    // Код домофона
  readonly floor?: string;   // Этаж
  readonly comment?: string; // Комментарий к адресу от клиента
  // ... тут можно расширять нашими данными
}

// Стурктура данных из сервиса Dadata
export interface IAddressObject {
  postal_code: string; // '129366';
  country: string; // 'Россия';
  country_iso_code: string; // 'RU';
  federal_district?: string;
  region_fias_id: string; // '0c5b2444-70a0-4932-980c-b4dc0d3f02b5';
  region_kladr_id: string; // '7700000000000';
  region_iso_code: string; // 'RU-MOW';
  region_with_type: string; // 'г Москва';
  region_type: string; // 'г';
  region_type_full: string; // 'город';
  region: string; // 'Москва';
  area_fias_id?: string;
  area_kladr_id?: string;
  area_with_type?: string;
  area_type?: string;
  area_type_full?: string;
  area?: string;
  city_fias_id: string; // '0c5b2444-70a0-4932-980c-b4dc0d3f02b5';
  city_kladr_id: string; // '7700000000000';
  city_with_type: string; // 'г Москва';
  city_type: string; // 'г';
  city_type_full: string; // 'город';
  city: string; // 'Москва';
  city_area?: string;
  city_district_fias_id?: string;
  city_district_kladr_id?: string;
  city_district_with_type?: string;
  city_district_type?: string;
  city_district_type_full?: string;
  city_district?: string;
  settlement_fias_id?: string;
  settlement_kladr_id?: string;
  settlement_with_type?: string;
  settlement_type?: string;
  settlement_type_full?: string;
  settlement?: string;
  street_fias_id: string; // '9c8dba99-bb48-459f-bc5f-a73e9e43e7d0';
  street_kladr_id: string; // '77000000000322000';
  street_with_type: string; // 'ул Ярославская';
  street_type: string; // 'ул';
  street_type_full: string; // 'улица';
  street: string; // 'Ярославская';
  house_fias_id: string; // '4dc675b3-8ea6-4fd1-8ebd-f4b62c5c6dd3';
  house_kladr_id: string; // '7700000000032200063';
  house_type: string; // 'д';
  house_type_full: string; // 'дом';
  house: string; // '21';
  block_type?: string;
  block_type_full?: string;
  block?: string;
  flat_type?: string;
  flat_type_full?: string;
  flat?: string;
  flat_area?: string;
  square_meter_price?: string;
  flat_price?: string;
  postal_box?: string;
  fias_id: string; // '4dc675b3-8ea6-4fd1-8ebd-f4b62c5c6dd3';
  fias_code: string; // '77000000000000032200063';
  fias_level: '8';
  fias_actuality_state: string; // '0';
  kladr_id: string; // '7700000000032200063';
  geoname_id?: string;
  capital_marker: string; // '0';
  okato: string; // '45280552000';
  oktmo: string; // '45349000';
  tax_office: string; // '7717';
  tax_office_legal: string; // '7717';
  timezone?: string;
  geo_lat?: string;
  geo_lon?: string;
  beltway_hit?: string;
  beltway_distance?: string;
  qc_geo?: string;
  qc_complete?: string;
  qc_house?: string;
  history_values?: string;
  unparsed_parts?: string;
  source?: string;
  qc?: string;
}
