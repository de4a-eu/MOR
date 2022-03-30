# MOR

## Overview

- The user identity data is stored in the web portal session.
- MOR components are HTML pages without access to web portal session data.
- MOR components can interact with the web portal pages by means of HTTP GET requests and client-side javascript.
- MOR components can access Connector’s APIs by means of Javascript HTTP requests (Ajax)

## Tasks

- [**Translation** of the canonical models](/../../issues/1),
- [Implementation of **explicit request (ER) page**](/../../issues/2),
- [Implementation of **preview**](/../../issues/3),
- [Interchangeable CSS for individual portal](/../../issues/4).

Existing pages for **Selection of evidence** and **Preview** that are already available in an existing implementation in Slovenia (part of DE4A) could be the starting point for the explicit request and preview GUIs respectively.

- There is some demo material available:
  - presentational videos available:
    - [Slovenia as a Data Provider](./material/SI-preview-app/final_es-de_si-do_compressed.mp4),
    - [Spain as a Data Provider](./material/SI-preview-app/SI-DE_ES-DO-2021-11-05.mp4),
  - screenshots of preview app ([select an evidence to preview](./material/SI-preview-app/si-previewapp-1.png), [preview of evidence](./material/SI-preview-app/si-previewapp-2.png)).

## Demo

- https://de4a-wp3.github.io/MOR/

## Video presentation

[![MOR demo](https://img.youtube.com/vi/gAwOs-M0_D0/0.jpg)](https://www.youtube.com/watch?v=gAwOs-M0_D0)

## Technical documentation

### Component diagram

![MOR component diagram](https://teaching.lavbic.net/plantuml/svg/dLPDR-8m4BtxLrZjOKyzLgfM29L5LAf45mHTQG-HAfDCmAfZPnq7YbRyznqxNmu90Us59CypRyPlPcoUCyEqoHD1tnOh6geaLHAaeH5dMyqIGh9FBbE6htJ3mi-jLhcCGYMKfaOpcU4IcdjM4SGi5-OTlin4yArCB5k8Fw0zgudMwZ1rD1k1lDvIayDVGZj13pjke8kFHbc-oOwPWMGyflVm53_6KPyPfWLQCe5M5waI5RKDb8v05_7l7rz-FCscvEHbpEtcOXP2RyPUCbTuf38ml6cF0AjpH2XMqdZ0YH01iQ56KSstErj73Q7XIX92cZpliDY1d7sbWeVS15B3dnmoVC5KSdouV02jiplACjiQ7xFLnoiTZMgEyVWMFfMR0SB5825TQjXpE9HPqHwEvPMS6eeYaNwEWJJM850-Y08fcDpcR0lEhuBd9NYPOAdLdcUeVqPJq84CiQf67ocJo1aogIGFcGWafXc1H0zpJ8iOdkT5zdSxWeAv14Fi19mQvzlWqm8zeo3Da3cPgihHid1-aQQqFLosGJtt5ow0vgbGB79UzlkN-qI_sWvZjhocXGo1p9oIIZlV4bsNs111fVmPGmNVGb4BZBisciFUrW7hGWj6N6ZNOLt1j3uYSDxEb2mRpkkkA_hTk97by4wQeELxawCB-5yXkp5RDB_VvZJr8kDt4xpjTseBDIkRtHuKfVAEeS9N5Khz0zjdg1fSQRi9lUSXj1fVwNM1jiNtALudS-U2ptOOqfdkXuTnbvdKfw9TheQ5T3hGhfupahwcieRDq1D__kqIvadgaVH2BaXzcbgqeo7fgbfvs-EJL2yDE2LLvpROWdIbzMMfJnhIFNi6zLds2zJJZBrsbwFPVP1lxavrLwAAkzfyfp-LknJiLHLJiyEMT5TPtISbGt6PeWbMuGOdyWmomZzL_m00 "MOR component diagram")

### Class diagram

![MOR class diagram](https://teaching.lavbic.net/plantuml/svg/nLXVRzis47_tfn2o5xUD2sp0W28BchfoYdbDvY3kiWB34D0Yex2XI8sad1Z3llkE_oHAbYrdtR0dctV7k-FTxtWylLCQILqLBBbSN2SPGqebcA9Sec8qKW-KbmZ-UiQVeoHPeUmXbwBYE1LCoEJndcfYw49Y8Xtjc-y_l7zpdW8LIIaU7N75OEVehqXfeogp4beYhe15k1xTKqoIZCgCaT4ejTQFBX3FAvIJH156CYtaKO9K4gXBJqn5KGeEEfBJqopyV_lMEl_AxIGuR3f9b9QKvuPdpJEaWVWf_5qIkQQPET-4-Itg99aXZIu4WlC6FIeId1XbET61zpCgo3WJk3Rs8hOQ2QenSCBYjzyxt0yCvIbesQsgh5QCPX2TUazNTYqeXXI4WAOGUoqtxNXwua7Xp9ni6banP4pkKCLqNv0nLMZ524vxTqwSGjeESXg8JP27aXLouCqCfi3B3SUubgKkNNwZonPLVZdpf-pgMGd12E8EYS5eRvBW33nVyEmUOWYM_Ez9igH5oKZgbjiPDKLy_bG23AXE9FcZ8ahRh0BZzlpwDktBufvqxQiNhpxaPnFpCiG5fnbYvsieP9wHJvlIkDz8Y4gNbVvfEPKIRUOu1W5kChz3pMn08a82teRH0BQYBNF4Oc5OzeejeKviS6PTKg_uvwAb5PO70tixiD6f4D-ul9Zr6Z4JYffQIh6cYWhU25Ob0mUQTI6mEQ39-5MGtiiqPwW53AmOCNutA7Tr2FTzfQ_CbGzigHOVn-rIW3E1oemG_2lLzm6-rmvU7Taxogdga_5LO-fgthBtILn9igRaCPQ2Ccu1nfPo7vJgQxWb_a78oFJpDlvYepwy3y0slnht5b9JBiT9pnNy8eA2TR9EMB-wHfcw5u-N9j5rpAEOTPMfTjXRo1WoH2E0yQfO4TbEJcHahoPtL1SpQ2qbGvi3VMY2f4MUCt8TLysG-xgjA3WEjp9cn2TuA086fDQ7pfMV7dJbM-7f7U3x1g0zvxGfWgORcFfCcBraaldqmZO2-8KUeDoDuZl0_txZ5Y9xg4f0_3LHq9jKSvlLdHoO_wWOZfCIQGWJxoI-YTBdoul4Nn4sGh3soxvcQPw1SHzxAjZSfJBgcb16Cw8oIKjj8HvTOF2-XU2VM2lsho5-KGlR3cjC1iACQ4IPYb0UE7LpmDjTjO7sy2l9OYu_67Irnfd8gWBY4bq2an9QZuO2f8uSV9v0-gQCVJpVg2d7DuZ1DJ8Mgoy1_KwkIKZjQk9XQjFIFS0MYbyfwBdXf8Y1e5dR1bD9CrGu_4MXS8JGl2XhCLDFYfDMCvlK5LGf27xWGBf_jBS0I5_kOfcOL8hCcdUNeL0bZ6hpbpnfmcr8JVMsTIWRQM3xrzAju17NPSpJZUOM8R8OqN7RZziGhh0saBTMRtN7ZPZW6wAb-oS8wRfTbTY4FUXpQ0jstAeJb8dlwH5v79TWkst4KgrdEqIxkssnCl0np_HJ0E1Rho7o-80DQlU6uoGEbjdz1HgaRR4LmvT4vkIihylwYSysL_isFdNwh3s4iMFQb7G4EXtK81J3VGhn6BTT0U-FamUoyV-WMeaiXOSrAjHPyBRfaQ1mR7U0BL7a0vkYI4NEWuwbbWGLYst0rifzRtoMyXzSyHlLRzvylIRAbKPSFqDHF2zrzgtDRTSiJTxEUh0hYIdqFdJte4uIF-BlgOJtKZmgztrYt1rWFIy5P5IIT4JQisJS5yq8UTK_GThXmClMcDapLfP2wMbcqdyJnyVUR6sMYt7KI_PCf3MlxyLb-NlwSYRu7PN54YxMfKQwsZqczGuw_z4Bwg39yf1l8UwHctOFEVX6_hUUjeD3OEdGupqakCF-ke7DVF-1qIiQ15i54Ok20z1xzIvfgeBmT0qlCrENOoqU23Sc-h_qH0RUR-nqqRUX7jEjqR2XLpI4rCt2szFjSyU81NVpWwdz-ZlHqSiZW4vozEtHxY-i7UcgdDW_kxuWzYg7UMGKRfP0_kxrwvT3Pg_QQff7-sZheMZu4-VQRftxTWM_1uN0gT7e7LHNLR2_0G00 "MOR class diagram")

## Materials

- [initial PoC](material/PoC/initial) provided by Ana Rosa,
- [translation](material/translation) of the descriptions of the the canonical evidence type and associated common types.
