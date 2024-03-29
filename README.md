# Multilingual Ontology Repository (MOR)

## Authors

- **Dejan Lavbič**, University of Ljubljana, Slovenia,
- **Ana Rosa Guzmán Carbonell**, Ministry of Economic Affairs and Digital Transformation, Spain,
- **Slavko Žitnik**, University of Ljubljana, Slovenia,
- **Thashmee Karunaratne**, Stockholm University, Sweeden.

## Overview

- The user identity data is stored in the web portal session.
- MOR components are HTML pages without access to web portal session data.
- MOR components can interact with the web portal pages by means of HTTP GET requests and client-side javascript.
- MOR components can access Connector’s APIs by means of Javascript HTTP requests (Ajax)

## Demo and integration

- https://de4a-eu.github.io/MOR/

## Video presentation

[![MOR demo](https://img.youtube.com/vi/gAwOs-M0_D0/0.jpg)](https://www.youtube.com/watch?v=gAwOs-M0_D0)

## Technical documentation

### Component diagram

![MOR component diagram](https://teaching.lavbic.net/plantuml/png/dLRTQzim47_NNo6MXptbiQMCKDg550hjOf8E1lCegdrEHHN9a-MqeVH_tqd-acCbDNj9xDFTxtxtALyLXcbJRWMzNwveehQvaY0DJJdRQBObf7ZXCcVuI9zOyhBHgfHfeeJIr6Wc2pn2TKyhXOoLmZp0cxaMV2Et5Yt17z2UrhNMwdNkO9u4udf77OTtGWTENv-vWQ5yDYlAfs9V6DXUNj89N6HdMHfIswgK2LHfSPHEGLVOaxERxnUBEVa8iPdDC2BGqbc_7rYcJBze23Yaaoo3SpZlONARZ8mb48pm1Fc6GOTWWwqzX6FfIOyWDEnzZb8PE5q0pnbsoXv5cPB64tmG8Y0pr2Yg-URPzfI6n70b2UbIyCNstU8j5ppXXchuMq9XOeayIaCT5q3LuWjbXMtHnyNgyPQ60_aSLPNcEEno76mi8mqx3gyroLW6uABH96imUfnQD8hP6WGc5z9O2YOt9Tk00sZ4TxKGaOu0H5hjU87LAMWEEfO9rjpeFMKICHCcbUG94x54kYb8j33xlFBXMNxEyy5k3S4SqmGR1aVBWNJoUIKzO4gwlH0ihb_9EUtl0zl7dlaD5q3BN2YMEYlx_jEzebshXpvxLlCg7x4iN4gLThQrT5tBJW4q9JX0QCHZ87xTtz6yQXXdY-zr_onMf-pQ2c6sZEQmiuN4mjAA2Hxq2xbknBJTc3ZE1nM8F29LdtwIzv49Y4v7qZbjHgVRwjRXVxaS-XoPzw7XHpzJYtfSOjccta4qybKZfVuDuoCqaw6qZKBlU0AzYL5wNKdxsVSXRg_ld0d-zzsGmNwOJY-7oAJTlDFVa_gw-8EApRoHGHDRc4Di4kel7n1jkbr2_BNITujXa7RKWuoMf5tg_VD1sicm44D4kyv9yn0wdfDc0aAdIpAibP_dTkUHuHQSdafp5CvpeBs3UiUzsOZ8L_SHuEvmbGqpzut-KEx2iXThHiqpzhYx7zl6gn6gsnzLi6uZZCWLo1I_IFy1 "MOR component diagram")

### Class diagram

![MOR class diagram](https://teaching.lavbic.net/plantuml/png/nLXVRzis47_tfn2o5xUD2sp0W28BchfoYdbDvY3kiWB34D0Iex2XI8sad1Z3llkE_oHIbYrdMx4dctV7u_7kTxmxlPCA2LMNDBbSN2SPHL8cEK65GELe91y8gn3yTOm_HqcoGjb38NZDyfHJBfB7UwAmfdEHOs5fttp_uVsRynIeI0Z-Q8ah2Zj7VmLAMrMPaL02CGaipDJedkGuoOZ8A1wDKdFwqGLYHOqAd4XCSQQuE4gGJ3nrwOWfBolEG4ToUfhv_s_V6kDVsPquzvjE4ga4OONccUCfKa3yvFykiLYJJDzlGjqMUPBCa48N7C5zlHuP24wqiW8hp_iPbNYSyRmvx4LuQY0eny3nYzz-xt0_K5Iae6MtAjaATuNMdEJWU-_959okn2Psf2CUvCVCogR1APgSupjKKzNdtPn8jA8uJtjtJgn24ditzSJMkqDHyivtnmpwtiaDExUH9JPERgCD4v5kENEtxEfPSKunOYvAJhWtI707LYnOTWy-X9FSxqco96L5SMgNsn7LsNl-L56I4PK8_4UDfJ9H1SRj-VLjsXV5FU7QboXElO_F9kHbY756CaJFrv31BCEVDfKslvNWjQfgzTDoAWJQpFCG17aR-HrgPWCI0HBoRHWDO2lOCaSq58PbhzWIyiGuPzObzOf_BYEji3mOsDkE3Mw5sCR6HQ_NY6fNDDHAy3MHXBDMiAue6D2kVR13LuOXAtck7Q25hhosPdCVKz-n4T2merZVgyq2cwTG26frfMi1i8LSV1p7gG9t1fKPnlclHDrxU5zR-7LaxmWZia_6PPNEktbqtYT-9V2QuCTG2j8y0fH9zJwesSIlh0RF62l-W9b-TBRJkgjQIttW8h0XUcn2qPGp1MbxeBG4kU3-UwplsVYBWSRmFiY8-TMuDzlRd3vEUkh4Ym2lniW6DVtgMcNodZzUQhGrWG-ysrKcuzX7y1mwY0GePtMvmY8EOt38NatsgjPdKFygYZO7sj0wIV6YeFWwJEqXyrMio1iEfIEds0Luo0CwKumDdReqPoJCAaDB3wfLHdXw1ubt0mYEzBHbJ3yS2JMlOpAVNfWA1hzGlAHz2btf-jzBHScpXxg2BBZ64eggR9_XfWK1vZzAaEEaGWhSn3fWQBtq-V8YSI-1yH2itRAlokl6DNmkdaewj-4DoZsarWpBJ91A6TW7BojqvE3y4tEA-Qk9N-J2rF46fvummmeHAWFaUqvJrVBjTg1n7dv26ZkjDsLsZqkqO7GJ6NL06sYmMHmCpaRZZ6Tr2VuBOGxll5AGlCII_Tqc4EOffH_FDtBAyXj4uGaQyzKNdpbMhWrSOshYu6p2rxt05jfVIMWg_4qH1K6zDXMo5dfSiZWDN649lleI6Z5JHmg3sp3R49T4IWYIvm0iVZGl24XVxc9fdzGIpzh6KbE8v5grZIzKCkDIdUMn3cay3MpN3jvo5d1jn1nTQuu8mOa1FO_jkFNkyckT6kRKMzKn8oIuOchehiV2NRFhAjTkz_eislmvTjLnoiGr9G5v7APgN792gQZuWxUxsnOh3HyzXvm20Dyw3O751soGkpSS9w6pzEulK5nDUQvfVeb5WS_wAhIRPKrXDit_gTLdpaDvRfac91s1JlNL2CtXtGL_Z6DJmFhZv05lt3_8LYmgxc2DIddchMthAoWScnrm5Y-BWKs1fmBZGSTI2OpAnJPW6-MkhZvB-Gys-RNgDs_-lIR2f49CFKDHz74XthVMhrsxr74xwy6km3hH-z3TWpg1tJUCFPdmNl17QR-yRBN1ZfS2Ccg1EoBni1pMJpqZN_MFo6QwSR8DPlRCpHMNQfhfyD-4_Z4lMyooFWvgoPwHUp8meKtsrU-CipiYoYKyh4k5LBrx3koTrBvIftNGw7p8nnxR8AVTImxsr_zLMpmunRePqLc8ymxxcHFdLviYYVJ2qpLqS3elUyVPVjFVRynaqhUX-Gvn-AXiX_djyVovuuQVLtJkDn_2ZbuU0NIIes-FTdyxxaZNrSJysVM9j5Svp2qZ_x9uydUlNxySElOgLjCszwEjHb7p9zQqtJhtxV9s3mg1KQFHEyYkkgH_0m00 "MOR class diagram")

## Materials

- [initial PoC](material/PoC/initial) provided by Ana Rosa,
- [translation](material/translation) of the descriptions of the the canonical evidence type and associated common types.
- Existing pages for **Selection of evidence** and **Preview** that are already available in an existing implementation in Slovenia (part of DE4A) could be the starting point for the explicit request and preview GUIs respectively.
  - There is some demo material available:
    - presentational videos available:
      - [Slovenia as a Data Provider](./material/SI-preview-app/final_es-de_si-do_compressed.mp4),
      - [Spain as a Data Provider](./material/SI-preview-app/SI-DE_ES-DO-2021-11-05.mp4),
    - screenshots of preview app ([select an evidence to preview](./material/SI-preview-app/si-previewapp-1.png), [preview of evidence](./material/SI-preview-app/si-previewapp-2.png)).
