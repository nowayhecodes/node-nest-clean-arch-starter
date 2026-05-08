INSERT INTO
  public.languages (id, "name", native_name, iso_code, created_date, updated_date, deleted_date, is_default, is_active)
VALUES
  (
    '354ebebe-e736-4358-ae75-5995e2a61714',
    'Português',
    'Português',
    'pt-BR',
    '2020-11-11 07:10:10-03',
    NULL,
    NULL,
    TRUE,
    TRUE
  ),
  (
    'c05ae051-b4ed-4226-8ae6-2de27e982256',
    'Espanhol',
    'Español',
    'es',
    '2020-11-11 07:10:10-03',
    NULL,
    NULL,
    FALSE,
    TRUE
  ),
  (
    '6dd278b7-57ce-4fb8-aee2-67e0ffb43ce9',
    'Inglês',
    'English',
    'en-US',
    '2020-11-11 07:10:10-03',
    NULL,
    NULL,
    FALSE,
    TRUE
  );

INSERT INTO
  public.time_zones (
    id,
    "name",
    created_date,
    updated_date,
    deleted_date,
    is_default,
    is_active,
    utc_offset,
    utc_dst_offset
  )
VALUES
  (
    '1fabf17f-1d05-4646-9190-900d9858deb2',
    'America/Sao_Paulo',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL,
    TRUE,
    TRUE,
    '-03:00',
    '-03:00'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '8293bb59-7e29-446b-a854-9b03c4cca1e6',
    'Leke',
    'ALL',
    'Lek',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '1fe25627-8806-451e-8d62-17cffcd77329',
    'Dollars',
    'USD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '246f8cec-936e-48ac-be25-35f06e12ef38',
    'Afghanis',
    'AFN',
    '؋',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'b14ea1ac-a087-4c0e-a279-15f45333a708',
    'Pesos',
    'ARS',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '36f9f97e-7b19-41d2-80af-dd0fc5fdf6ed',
    'Guilders',
    'AWG',
    'ƒ',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '276b9202-6d02-4b86-bf03-fef4d5a7cca3',
    'Dollars',
    'AUD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'b2ca57c4-2c1d-40e5-a720-cde10537ad5f',
    'New Manats',
    'AZN',
    'ман',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '9a562e46-62ac-44ac-a532-238553b2e3c0',
    'Dollars',
    'BSD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '6db51e22-faf3-418a-9fb8-993cc12cde74',
    'Dollars',
    'BBD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '2639357f-37ec-484e-808e-3385e9f0fdd2',
    'Rubles',
    'BYR',
    'p.',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'b6f66103-ef5a-428e-910e-383b60e6a522',
    'Euro',
    'EUR',
    '€',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '8dcc5ad4-122f-406b-92eb-89efd32b549e',
    'Dollars',
    'BZD',
    'BZ$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '08a98f71-3f75-4948-b90c-e8a591f4e771',
    'Dollars',
    'BMD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '38e87f48-fe77-44b2-95ca-d8301460267a',
    'Bolivianos',
    'BOB',
    '$b',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '9639a555-27d9-44f4-adca-b4f8165d2ce9',
    'Convertible Marka',
    'BAM',
    'KM',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '1ed51a78-b51f-48ac-88ef-4d677ab44a1d',
    'Pula',
    'BWP',
    'P',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '92b3b5db-6d90-4d54-8dde-0b5005a11691',
    'Leva',
    'BGN',
    'лв',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'afc1c502-8b76-4cd5-847d-afb0f4338d6e',
    'Reais',
    'BRL',
    'R$',
    TRUE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'a9e6418c-b140-4e90-9f6f-2e36459cdaa1',
    'Pounds',
    'GBP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'c337025d-6ae2-4aa5-ae48-2d755dc3a146',
    'Dollars',
    'BND',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'c84691c9-6846-45d1-bf47-f2321c78e50c',
    'Riels',
    'KHR',
    '៛',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '21f4dbed-a1b1-48d0-ad9e-7bdc851e452d',
    'Dollars',
    'CAD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '3bbdc80e-768c-4c36-8e61-6797f837cb96',
    'Dollars',
    'KYD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '9fa2d952-c8b0-4e09-961e-5c054357eda2',
    'Pesos',
    'CLP',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'd9a0be95-b3e8-40c2-9ea9-d7ebf58dc4ef',
    'Yuan Renminbi',
    'CNY',
    '¥',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '7094ce1a-c032-48e1-8037-53d61a7222f6',
    'Pesos',
    'COP',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ac45b35b-1d41-43a9-bd89-9682ca600310',
    'Colón',
    'CRC',
    '₡',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '6df1d730-4209-4c05-a206-ca98c11bd493',
    'Kuna',
    'HRK',
    'kn',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '65d1e428-320e-42b6-9c13-e03e9983df23',
    'Pesos',
    'CUP',
    '₱',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '77c2a0c4-6fe0-4706-b558-25f6989cd729',
    'Koruny',
    'CZK',
    'Kč',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '3bc18455-8416-4b5d-8ccd-e10ac88b0679',
    'Kroner',
    'DKK',
    'kr',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'd2f9b73e-91f8-42f2-9794-b1e6e8d981d9',
    'Pesos',
    'DOP ',
    'RD$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'f8d5e268-1a73-419f-b015-c2179eda589b',
    'Dollars',
    'XCD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'f1698981-b9f8-4228-b4e2-de4990e8f37b',
    'Pounds',
    'EGP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '524ab139-649c-4fbd-8a50-65a4c7abace2',
    'Colones',
    'SVC',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'bc8e8cc9-0740-4dc4-9fbc-39e675a8b3ee',
    'Pounds',
    'FKP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '4cd9a698-505d-4e08-b5ca-78e21fe972c8',
    'Dollars',
    'FJD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'c761d54b-ae43-4ac9-861e-997d388f1796',
    'Cedis',
    'GHC',
    '¢',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '61044818-32f9-4682-bb47-8b79bac3ffa1',
    'Pounds',
    'GIP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '0bf336e9-2074-4722-9776-19969a94411b',
    'Quetzales',
    'GTQ',
    'Q',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'cccf929d-745e-4597-8a07-152142303827',
    'Pounds',
    'GGP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'cdc33782-9e1c-47ef-9bc4-c9f27f39e373',
    'Dollars',
    'GYD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '724c28c1-c445-468d-807f-f87ced2dd939',
    'Lempiras',
    'HNL',
    'L',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '6785b8d0-1ad8-4424-9f11-30097c9e77be',
    'Dollars',
    'HKD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '42e63b99-814e-40da-96b0-baf317976049',
    'Forint',
    'HUF',
    'Ft',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '863cac7d-9055-4abb-812b-7230de313d54',
    'Kronur',
    'ISK',
    'kr',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '48e00e14-6567-455e-9b75-70eafcad69b6',
    'Rupees',
    'INR',
    'Rp',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '767b6842-12c0-4a7d-8ff4-6b6a2a49e578',
    'Rupiahs',
    'IDR',
    'Rp',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '766f2e6e-4836-4bf8-9ab1-80d2ed98092a',
    'Rials',
    'IRR',
    '﷼',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '66925af1-587b-4de3-9097-c53100188c51',
    'Pounds',
    'IMP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'b7acb3d6-2545-4feb-8e27-f343647a13ca',
    'New Shekels',
    'ILS',
    '₪',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'd3934cec-4822-46ac-bb54-018816733adf',
    'Dollars',
    'JMD',
    'J$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ab52b93c-1f5f-4675-9f4d-299b693a29a0',
    'Yen',
    'JPY',
    '¥',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'c30e4937-3f6d-4156-afc7-e53f68bfce4a',
    'Pounds',
    'JEP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'b68adc49-165f-48f8-8866-31e697d19c38',
    'Tenge',
    'KZT',
    'лв',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '7b94525f-dccc-4694-9498-6c325517a357',
    'Won',
    'KPW',
    '₩',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '918f8ca8-3c46-4ebf-ae9c-b06c16045787',
    'Won',
    'KRW',
    '₩',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '25b6f3ae-61f3-4a72-88a4-adb49b5face5',
    'Soms',
    'KGS',
    'лв',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ef144a9d-8db6-49c9-a8c3-8fc37c090a2d',
    'Kips',
    'LAK',
    '₭',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '8822ec0b-02a4-4539-877e-329cfc8c9c74',
    'Lati',
    'LVL',
    'Ls',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ee8d10a9-e171-45e6-9731-059591daefd4',
    'Pounds',
    'LBP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '629b6111-25c0-4f49-bf82-7fdc69940856',
    'Dollars',
    'LRD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '345f9791-6eaa-42e3-8c4d-11dc7fd5595b',
    'Switzerland Francs',
    'CHF',
    'CHF',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '21a69ac9-bfa6-4a5d-9357-d6bd508b479b',
    'Litai',
    'LTL',
    'Lt',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '2ba4a8bd-e6f7-40f1-baa9-a648603f2190',
    'Denars',
    'MKD',
    'ден',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '600e2e90-11d7-4e01-8056-3a3360d87a22',
    'Ringgits',
    'MYR',
    'RM',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '3ac7bf3b-3b73-4ac7-ab7e-ba01b9f3e30f',
    'Rupees',
    'MUR',
    '₨',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '60717817-5d19-4d24-a035-809c3bcc2800',
    'Pesos',
    'MXN',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '7a9897d2-5f14-404e-ae0c-ac72ef6db76d',
    'Tugriks',
    'MNT',
    '₮',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ffae5c55-8f82-4935-a608-3940103d2626',
    'Meticais',
    'MZN',
    'MT',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ae52c3d0-ba7f-4cc3-8d58-f19f56bf57da',
    'Dollars',
    'NAD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '5ee3991e-3562-4824-a555-664d17b57b4d',
    'Rupees',
    'NPR',
    '₨',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '3e82bb81-281b-41ab-a45c-0e985a83350c',
    'Guilders',
    'ANG',
    'ƒ',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '72efd613-13f8-4342-884e-9b9205dd67ac',
    'Dollars',
    'NZD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '2fe4bb4b-434f-4593-9f4d-252aa9b7f273',
    'Cordobas',
    'NIO',
    'C$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'af8da0e0-5143-4a0c-bc94-41d5eff3e249',
    'Nairas',
    'NGN',
    '₦',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'dd17c2b4-f443-4821-b273-5bb36650e173',
    'Krone',
    'NOK',
    'kr',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'e5563eb2-17b0-4a90-ad59-57a304dce60e',
    'Rials',
    'OMR',
    '﷼',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '93d3e9ea-53a2-4948-8ac9-7f12d7a5330d',
    'Rupees',
    'PKR',
    '₨',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '279cac1d-a0c6-470e-85ce-ab35953ca8ec',
    'Balboa',
    'PAB',
    'B/.',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '43298266-4e8a-4029-b253-61589150cf41',
    'Guarani',
    'PYG',
    'Gs',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'cf579569-000f-46e4-a51e-218170336799',
    'Nuevos Soles',
    'PEN',
    'S/.',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '4f425ae7-ef2f-4b4a-8bac-0897034b1433',
    'Pesos',
    'PHP',
    'Php',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '42a1d1b3-1444-46e9-8ae8-0b19fd929ab8',
    'Zlotych',
    'PLN',
    'zł',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'a3e4c03d-7de6-4490-8fd5-1d15c1ffada0',
    'Rials',
    'QAR',
    '﷼',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'd4125fc0-d298-46f6-aace-8c5fb89591c4',
    'New Lei',
    'RON',
    'lei',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '3da1ebc1-5006-452e-a111-deb393fdb0ba',
    'Rubles',
    'RUB',
    'руб',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '15a529e8-1737-4816-b274-2b7fd33401dd',
    'Pounds',
    'SHP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ed46dff2-d2a4-42ef-ab11-0c80a63fd41b',
    'Riyals',
    'SAR',
    '﷼',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '687d8272-58d2-428a-8a45-a4b2109d0ddb',
    'Dinars',
    'RSD',
    'Дин.',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'f99243c0-9dfd-4089-8dc4-27d10e67e2ab',
    'Rupees',
    'SCR',
    '₨',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ee09a48e-9165-464b-8086-240e45891417',
    'Dollars',
    'SGD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ce8df90c-a47d-469a-86dd-906adca8f71e',
    'Dollars',
    'SBD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'f22b48cf-9467-4536-a76b-70e864883e18',
    'Shillings',
    'SOS',
    'S',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '9c0945bd-583b-48f4-8f89-e40d65479760',
    'Rand',
    'ZAR',
    'R',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'ab5788c2-ceaf-457f-9265-83493049ee09',
    'Rupees',
    'LKR',
    '₨',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'e121e4e3-5d6c-4570-a863-59000f20bb35',
    'Kronor',
    'SEK',
    'kr',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '68fd3354-9a7a-4fee-9ea1-262ab79a12ff',
    'Dollars',
    'SRD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '8d7f072f-5f39-4ae1-87fb-a62f38c4340f',
    'Pounds',
    'SYP',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '86cc68dd-541d-44e6-a6b4-70de37ce0583',
    'New Dollars',
    'TWD',
    'NT$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '9697dc5c-e4b5-40f3-be1f-db7991f5866b',
    'Baht',
    'THB',
    '฿',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'd09be9ce-4157-4ca7-8aea-33e00db5283c',
    'Dollars',
    'TTD',
    'TT$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'a90c438d-e183-4b3f-9cf1-e28b01ebaf3b',
    'Lira',
    'TRY',
    '₺',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '1b448c86-0dd9-45af-bb1a-25d08221b413',
    'Liras',
    'TRL',
    '£',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '0ede250b-af6e-4ae2-a39d-abe7b946a842',
    'Dollars',
    'TVD',
    '$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '2d725ba4-68a0-4ebe-8b4e-71428a1f29ae',
    'Hryvnia',
    'UAH',
    '₴',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '409a7e85-f93d-43be-9025-f659657e1ea0',
    'Pesos',
    'UYU',
    '$U',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'a78be28b-d132-4f67-abe9-9995bf20f6ce',
    'Sums',
    'UZS',
    'лв',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'c379da0b-e39c-4f75-899b-5e47dd81097c',
    'Bolivares Fuertes',
    'VEF',
    'Bs',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '9b3f8ac2-6f7b-4110-b6f4-b6e20524015b',
    'Dong',
    'VND',
    '₫',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    '618870dc-58a6-4501-93ff-d49ec51a10f3',
    'Rials',
    'YER',
    '﷼',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.currencies (id, name, iso_code, symbol, is_default, is_active, created_date)
VALUES
  (
    'e48c5488-4670-4851-b427-ff7de4b53270',
    'Zimbabwe Dollars',
    'ZWD',
    'Z$',
    FALSE,
    TRUE,
    '2022-09-23 01:16:08.646 -0300'
  );

INSERT INTO
  public.data_types (id, "name", created_date, updated_date, deleted_date)
VALUES
  (
    '21f090f2-e538-4cdd-aa7e-68f8984fcafe',
    '{
      "pt-BR": "Configuração Inicial",
      "en-US": "Initial Config"
    }',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  );

INSERT INTO
  public.system_configurations (
    id,
    "name",
    data_type_id,
    "description",
    slug,
    is_global,
    is_hidden,
    int_value,
    bool_value,
    string_value,
    uuid_value,
    timestamp_value,
    created_date,
    updated_date,
    deleted_date
  )
VALUES
  (
    '71a53bb3-9172-481a-a5f6-01b37c749a46',
    'Registration Expiration Days',
    '21f090f2-e538-4cdd-aa7e-68f8984fcafe',
    'Number of days left until a registration becomes invalid.',
    'REG_EXPIRATION_DAYS',
    'true',
    'false',
    30,
    NULL,
    NULL,
    NULL,
    NULL,
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  );

INSERT INTO
  public.system_configurations (
    id,
    name,
    data_type_id,
    description,
    slug,
    is_global,
    is_hidden,
    int_value,
    bool_value,
    string_value,
    uuid_value,
    timestamp_value,
    created_date,
    updated_date,
    deleted_date
  )
VALUES
  (
    '1f5f9da7-89e2-4ace-970b-c24611e299ed',
    'Access Failed Block Times',
    '21f090f2-e538-4cdd-aa7e-68f8984fcafe',
    'Amount of fail login times that blocks user.',
    'FAILED_TIMES_BLOCK',
    TRUE,
    FALSE,
    3,
    NULL,
    NULL,
    NULL,
    NULL,
    '2020-11-25 12:13:10.435',
    NULL,
    NULL
  ),
  (
    '2b186b52-7a4d-47ef-ae80-c833ffb76351',
    'Block Failed  Access Time',
    '21f090f2-e538-4cdd-aa7e-68f8984fcafe',
    'Time of each period that user is blocked.',
    'BLOCKED_ACCESS_TIME',
    TRUE,
    FALSE,
    5,
    NULL,
    NULL,
    NULL,
    NULL,
    '2020-11-25 12:13:10.435',
    NULL,
    NULL
  );

INSERT INTO
  public.system_configurations (
    id,
    name,
    data_type_id,
    description,
    slug,
    is_global,
    is_hidden,
    int_value,
    bool_value,
    string_value,
    uuid_value,
    timestamp_value,
    created_date,
    updated_date,
    deleted_date
  )
VALUES
  (
    '6a2770ae-6b3c-4617-bf25-c0650b40806e',
    'Need Email Confirmation',
    '21f090f2-e538-4cdd-aa7e-68f8984fcafe',
    'Amount of fail login times that blocks user.',
    'NEED_EMAIL_CONFIRM',
    TRUE,
    FALSE,
    NULL,
    TRUE,
    NULL,
    NULL,
    NULL,
    '2020-11-25 12:13:10.435',
    NULL,
    NULL
  );

INSERT INTO
  public.roles (id, "name", "is_user_default", "is_admin_default", created_date, updated_date, deleted_date)
VALUES
  (
    '8afc7bba-505c-4810-94d3-028129871efe',
    'User default',
    'true',
    'false',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    'Admin default',
    'false',
    'true',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  );

INSERT INTO
  public.actions (id, "name", slug, "description", created_date, updated_date, deleted_date)
VALUES
  (
    '768d3ff9-4c69-43fb-af9d-da9918209353',
    '{
      "pt-BR":"Criar",
      "en-US":"Create"
    }',
    'create',
    'Create',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '3020598d-7b07-4f71-99ca-9cfdb631b97f',
    '{
      "pt-BR": "Editar",
      "en-US":"Edit"
    }',
    'edit',
    'Edit',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '6acbcd84-45c7-4670-ae69-e45a86bb06f0',
    '{
      "pt-BR": "Modificar",
      "en-US":"Modify"
    }',
    'modify',
    'Modify',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    'bbd149b7-95f2-4063-aea5-51026405866a',
    '{
      "pt-BR": "Visualizar",
      "en-US":"View"
    }',
    'view',
    'View',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '01af3d39-9e51-47db-bfdd-8f186cfb7287',
    '{
      "pt-BR": "Deletar",
      "en-US":"Delete"
    }',
    'delete',
    'Delete',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '61d79b95-a20d-4b89-bb97-96db7e7ea286',
    '{
      "pt-BR": "Gerenciar Usuário",
      "en-US":"Manage User"
    }',
    'manage-user',
    'Manage User',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    'e658bddd-b2bb-4aaa-ab7a-622722c6c0af',
    '{
      "pt-BR":"Período de Fechamento",
      "en-US":"Close Period"
    }',
    'close-period',
    'Close Period',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  );

INSERT INTO
  public.permission_groups (id, "name", slug, parent_permission_group_id, created_date, updated_date, deleted_date)
VALUES
  (
    '8e8d78e6-4a60-4e9f-8cba-e218b6db8d94',
    '{
      "pt-BR":"Acesso",
      "en-US":"Access"
    }',
    'access',
    NULL,
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    'fa40222d-978c-4425-8a51-da470e202a5b',
    '{
      "pt-BR":"Perfil de permissão",
      "en-US":"Permission"
    }',
    'permission-profile',
    '8e8d78e6-4a60-4e9f-8cba-e218b6db8d94',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    'e3da864b-9bc3-4a6f-95c2-4c0129b94bfd',
    '{
      "pt-BR":"Projetos",
      "en-US":"Projects"
    }',
    'projects',
    NULL,
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '61aa82fc-6399-44a1-b4ed-e7f511ec0c0b',
    '{
      "pt-BR":"Financeiro",
      "en-US":"Financial"
    }',
    'financial',
    NULL,
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '24fcd758-5742-4d56-b3c8-8ecfca88708f',
    '{
      "pt-BR":"Contratos",
      "en-US":"Contracts"
    }',
    'contracts',
    '61aa82fc-6399-44a1-b4ed-e7f511ec0c0b',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '15c2c885-9502-4e68-a677-870e27835cc9',
    '{
      "pt-BR":"Faturamento",
      "en-US":"Billing"
    }',
    'billing',
    '61aa82fc-6399-44a1-b4ed-e7f511ec0c0b',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '0eb7f1b8-f6bf-4676-83cb-3d286e0afd13',
    '{
      "pt-BR":"Colaboradores",
      "en-US":"Employees"
    }',
    'employees',
    NULL,
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  );

INSERT INTO
  public.permissions (
    id,
    "name",
    slug,
    description,
    action_id,
    permission_group_id,
    created_date,
    updated_date,
    deleted_date
  )
VALUES
  -- Permission Profile
  (
    '3f87470b-fb4e-4216-baba-2275c805000c',
    '{
      "pt-BR":"Criar Perfil de Permissão",
      "en-US":"Create Permission Profile"
    }',
    'create-permission-profile',
    '{
      "pt-BR":"Criar Perfil de Permissão",
      "en-US":"Create Permission Profile"
    }',
    '768d3ff9-4c69-43fb-af9d-da9918209353',
    'fa40222d-978c-4425-8a51-da470e202a5b',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '3cece89f-e33c-4771-8fa5-5f08129708ea',
    '{
      "pt-BR":"Editar Perfil de Permissão",
      "en-US":"Edit Permission Profile"
    }',
    'edit-permission-profile',
    '{
      "pt-BR":"Editar Perfil de Permissão",
      "en-US":"Edit Permission Profile"
    }',
    '3020598d-7b07-4f71-99ca-9cfdb631b97f',
    'fa40222d-978c-4425-8a51-da470e202a5b',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '9f81ef20-9949-4061-8557-5cf95165d140',
    '{
      "pt-BR":"Visualizar Perfil de Permissão",
      "en-US":"View Permission Profile"
    }',
    'view-permission-profile',
    '{
      "pt-BR":"Visualizar Perfil de Permissão",
      "en-US":"View Permission Profile"
    }',
    'bbd149b7-95f2-4063-aea5-51026405866a',
    'fa40222d-978c-4425-8a51-da470e202a5b',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '6b6a97c4-f01a-45ff-b98e-f31e223a1b60',
    '{
      "pt-BR":"Deletar Perfil de Permissão",
      "en-US":"Delete Permission Profile"
    }',
    'delete-permission-profile',
    '{
      "pt-BR":"Deletar Perfil de Permissão",
      "en-US":"Delete Permission Profile"
    }',
    '01af3d39-9e51-47db-bfdd-8f186cfb7287',
    'fa40222d-978c-4425-8a51-da470e202a5b',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    'a3883363-6cb9-4bb1-89c6-9181157891eb',
    '{
      "pt-BR":"Gerenciar Perfil de Permissão de Usuário",
      "en-US":"Manager User Permission Profile"
    }',
    'manager-user-permission-profile',
    '{
      "pt-BR":"Gerenciar Perfil de Permissão de Usuário",
      "en-US":"Manager User Permission Profile"
    }',
    '61d79b95-a20d-4b89-bb97-96db7e7ea286',
    'fa40222d-978c-4425-8a51-da470e202a5b',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  -- Projects
  (
    'cafef419-0a92-46bd-a707-482681466fdd',
    '{
      "pt-BR":"Criar Projeto",
      "en-US":"Create Project"
    }',
    'create-project',
    '{
      "pt-BR":"Criar Projeto",
      "en-US":"Create Project"
    }',
    '768d3ff9-4c69-43fb-af9d-da9918209353',
    'e3da864b-9bc3-4a6f-95c2-4c0129b94bfd',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '7da4a1c5-72f5-4382-bafd-1160e2c3a51e',
    '{
      "pt-BR":"Editar Projeto",
      "en-US":"Edit Project"
    }',
    'edit-project',
    '{
      "pt-BR":"Editar Projeto",
      "en-US":"Edit Project"
    }',
    '3020598d-7b07-4f71-99ca-9cfdb631b97f',
    'e3da864b-9bc3-4a6f-95c2-4c0129b94bfd',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    'd10b88a5-c8e5-4926-8b7d-f2450a2b5124',
    '{
      "pt-BR":"Visualizar Projeto",
      "en-US":"View Project"
    }',
    'view-project',
    '{
      "pt-BR":"Visualizar Projeto",
      "en-US":"View Project"
    }',
    'bbd149b7-95f2-4063-aea5-51026405866a',
    'e3da864b-9bc3-4a6f-95c2-4c0129b94bfd',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  -- Contracts
  (
    'f56f7da7-af7d-4891-9ce7-22adb1b210ff',
    '{
      "pt-BR":"Criar Contrato",
      "en-US":"Create Contract"
    }',
    'create-contract',
    '{
      "pt-BR":"Criar Contrato",
      "en-US":"Create Contract"
    }',
    '768d3ff9-4c69-43fb-af9d-da9918209353',
    '24fcd758-5742-4d56-b3c8-8ecfca88708f',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '416fc9c2-19bc-43b1-8dd9-04677ee5d79f',
    '{
      "pt-BR":"Vizualizar Contrato",
      "en-US":"View Contract"
    }',
    'view-contract',
    '{
      "pt-BR":"Vizualizar Contrato",
      "en-US":"View Contract"
    }',
    'bbd149b7-95f2-4063-aea5-51026405866a',
    '24fcd758-5742-4d56-b3c8-8ecfca88708f',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  -- Billing
  (
    'fb13167d-ea66-4438-98f3-56f3a573a9e0',
    '{
      "pt-BR":"Criar Faturamento",
      "en-US":"Create Billing"
    }',
    'create-billing',
    '{
      "pt-BR":"Criar Faturamento",
      "en-US":"Create Billing"
    }',
    '768d3ff9-4c69-43fb-af9d-da9918209353',
    '15c2c885-9502-4e68-a677-870e27835cc9',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '66c75691-c8d1-4531-a366-7bc6ef3664eb',
    '{
      "pt-BR":"Criar Período de Fechamento",
      "en-US":"Close Period Billing"
    }',
    'close-period-billing',
    '{
      "pt-BR":"Criar Período de Fechamento",
      "en-US":"Close Period Billing"
    }',
    'e658bddd-b2bb-4aaa-ab7a-622722c6c0af',
    '15c2c885-9502-4e68-a677-870e27835cc9',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  -- Employees
  (
    '2d791e7c-7ee4-437e-b3e2-c81ba734ff7a',
    '{
      "pt-BR":"Criar Colaborador",
      "en-US":"Create Employee"
    }',
    'create-employee',
    '{
      "pt-BR":"Criar Colaborador",
      "en-US":"Create Employee"
    }',
    '768d3ff9-4c69-43fb-af9d-da9918209353',
    '0eb7f1b8-f6bf-4676-83cb-3d286e0afd13',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    '5831101d-3b49-430d-808a-10e1da4c7a5c',
    '{
      "pt-BR":"Editar Colaborador",
      "en-US":"Edit Employee"
    }',
    'edit-employee',
    '{
      "pt-BR":"Editar Colaborador",
      "en-US":"Edit Employee"
    }',
    '3020598d-7b07-4f71-99ca-9cfdb631b97f',
    '0eb7f1b8-f6bf-4676-83cb-3d286e0afd13',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  ),
  (
    'bffd438d-f20d-43ec-a7bb-5e6992b2c9fc',
    '{
      "pt-BR":"Vizualizar Colaborador",
      "en-US":"View Employee"
    }',
    'view-employee',
    '{
      "pt-BR":"Vizualizar Colaborador",
      "en-US":"View Employee"
    }',
    'bbd149b7-95f2-4063-aea5-51026405866a',
    '0eb7f1b8-f6bf-4676-83cb-3d286e0afd13',
    '2024-08-14 17:42:40.240-03',
    NULL,
    NULL
  );

INSERT INTO
  public.role_permissions (id, "role_id", "permission_id", created_date, updated_date, deleted_date)
VALUES
  (
    'd00b47ff-8382-42cc-98e8-7593f3f17af5',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '3f87470b-fb4e-4216-baba-2275c805000c',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '7f40a8e0-3444-4bf2-8d4c-159d45ab523b',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '3cece89f-e33c-4771-8fa5-5f08129708ea',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '473413ff-257e-4995-a997-5125f2e0b5b2',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '9f81ef20-9949-4061-8557-5cf95165d140',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    'a72b2de9-71c4-4e4f-b1a4-b6ce20e75591',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '6b6a97c4-f01a-45ff-b98e-f31e223a1b60',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '2200c039-e50c-47af-b918-d968511ac1f2',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    'a3883363-6cb9-4bb1-89c6-9181157891eb',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '15d7378f-4958-4308-8320-4cb6461fe71b',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    'cafef419-0a92-46bd-a707-482681466fdd',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '0d3a7a82-e941-40b4-87e0-5804024ae889',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '7da4a1c5-72f5-4382-bafd-1160e2c3a51e',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    'def33024-c97b-49f9-8c33-07a4c7af10e0',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    'd10b88a5-c8e5-4926-8b7d-f2450a2b5124',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '099ab2f9-e9a8-42a9-adea-5b503791b2da',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    'f56f7da7-af7d-4891-9ce7-22adb1b210ff',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '80550b40-2893-4d66-8a56-710aa7dd6eae',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '416fc9c2-19bc-43b1-8dd9-04677ee5d79f',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '42256e09-d4f0-4f9e-ae4f-0d52a0f33483',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    'fb13167d-ea66-4438-98f3-56f3a573a9e0',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '277929e8-e499-4bd6-8b8c-d014ac484500',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '66c75691-c8d1-4531-a366-7bc6ef3664eb',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    'f91f5b79-e5d7-4a14-95d3-84542d56a9af',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '2d791e7c-7ee4-437e-b3e2-c81ba734ff7a',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '54ffb950-79bb-41f5-af74-e8ead6aeff20',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    '5831101d-3b49-430d-808a-10e1da4c7a5c',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  ),
  (
    '230541d5-542e-4018-99a4-a8dba66ef11c',
    '9a3e8688-7c1e-4a2d-afd3-c2ffb4117714',
    'bffd438d-f20d-43ec-a7bb-5e6992b2c9fc',
    '2020-11-25 12:13:10.435-03',
    NULL,
    NULL
  );