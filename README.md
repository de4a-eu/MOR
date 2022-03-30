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

![MOR class diagram](https://teaching.lavbic.net/plantuml/svg/nLXVRzis47_tfn2o5xTD2cp0W28BahfoYdbDvY3EiWB34D0Yex2XI8sad1Z3llkE_oHAbYrdtR0dctV7k-FTxtWylLSQILqLBBcSNoSPGqebcA9Sec8qKe-KbmZ-UiQVeoHPekmnbwBYE1LCoEJfWMfYw49Y8Xtjc-y_VdXtdW8LIIcU7779OEVehqXfeogp4beYhe15k1uzK4oIZCgCaT4ejTOFBX3FAvIJH156CYtaGO9K4gWBJqn5KGeEEfAJaopyFpsrphznEmaEcuuJfINbkU5Pymnf8Dw4lmiYLpGpvpjYVeiwJgP8emk1uBn1Zue4ZuoodEZ0-naLP9m9N1jx5LkD1DKOE67ns-yTxaU6yXIqR5TLLaj6CuXElQShkn8KGmf2G5E8lPRhTZmzSQzmPausZQmOCYRtg6AwByYOAhHa1AUzEu-SGjeESXg8JP27aXLouCqCfi3B3SUubgKkNNwZonPLVZdrf-pgMGh12E8EYS5eRvBW33oVy-m1OWYM_Eznig15oKZgbfiPDKLy_bm23AXE9FcZ8ahRh0BZxlpwBktBuevqxQeNhpxaPntpCiG5fnbYvoieP9wHctLft6yaHANBIl-qc4Y9rZCSWm0tcT-YPZeW4I41Ry9e05lHbXbYiJ0iUyKMK2SsEDCkgLVySz7I2ikzWRqPsEXKYAzTNinwXPW9HKqjfLXHHGLl1AkIWGFDkX3O7D1a_2f8xsIQCzG21bQC6ByRbBiwXFk-qbVcoWUsLFDFutOfm9b0PKO8_fNgXm3VQmUlZkmzvLJroVYgCNKrQzcx4LUIh2XvYgMWZ5k0iQNS1wNw6cw9VnGoClsoZR_Og0_l0x3DhiQzXTIKos7ISmM_Yg1WdQmJrg-kKQOUnDEbINGTyoXcNMMg7VOMCeOCqGXWl2gMHBQJ4ndPgSaTrSKCMal9q7fF7veWQP7dZ5p7LJFalcuh2ex3hOmPyGaUYe01gVMXS-MdUrtvLdXo3_Y-1MZFE6sAeEa6fZuJPY-PP3Qvi8q0Vg47A7UZ-0xmlz-uXSWUgn8GVqqKz2RLt6Pr9mVcFog6mwH46iB4EublelJvyYBnLuID4ApzigzPccTWtCUU2pPpgOow9fJHbAXCqb9RY4SN6Bnl8VZ7rehzQuXVrDosmngJWJ0b6b6c8fG7JjqSy6PNRQ0z_4gocClt1bsjSIgoge2uH9V0KGcjHqC1KaSEFXz1-YQCVJfVgmd7juZ1DJ8Mooy1_KwkIKZjQk9XQjFIFS06YjyewBdXf8Y1e5dR1bD9CrGu_4MXS8JGl2XhCLDFYfDMCvlK5LGf27xWGBf_jBS0I5zkOvcOL8fCctUNeL0bZ6hpbpnhmcr8JVMsTIWRQM3xrzATu17NPSpJZUOM8R8OqN7RZxiGhh0saBTMxtJ7ZPZW6wAb-oS8wRfTbTY4FUXpQ0jstAeJb2FVqoFoE2x1Tjk8fLhFTeXsTzjyQU1Zdkad0C1Jho7oU8yDQlk6moGEbjdz1HgaRR4LmvT4vkIihylwYSysL_isFd7wh3s4iMFQb7G4EXtK81J3VGhn6BTT0UyFaqUozl-WMeaiXOSrAjHPyBRfaQ1mR7U0BL7a0vkYI4NEWuw5bWGLyqt0rifzRtoHyXzSyHlLxzvzlIRAbKPSlq1HF2zrzgtCRTSiJTxEUh0hYIdqFdJte4uIF-Blg8GFKZmfztrYt1rWFIy5P5IIT4JQisJS5yq8UTK_GThXmClMcDanLfP2wKbcqdyRnyVUR6sMYt7KItPCf3MlxyLb-JlwSYRuFPN50YxMXKQwsZuczGuw_z4BQg_9Sfzl8UwHctOFEVX6_hUUjeD3OEdGupqakCF-ke7DVF-1qIiQ15i54Ok20z1xzJPfgeBmP0KlCrENOoqU2JSc-h_qH0O-hErqqRUX7jEjqR2XLpI4rCt2czFjIyU8ENVpWwdz-ZlHmUi3W4voyEt1zY-iczBmi-txOQzgc4P6uLu9vE_UldqzPFIghQPvieysdec6xrtRhdFNhk3te10uDHgzXzgg2lOt "MOR class diagram")

## Materials

- [initial PoC](material/PoC/initial) provided by Ana Rosa,
- [translation](material/translation) of the descriptions of the the canonical evidence type and associated common types.
