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

## Materials

- [initial PoC](material/PoC/initial) provided by Ana Rosa,
- [translation](material/translation) of the descriptions of the the canonical evidence type and associated common types.
