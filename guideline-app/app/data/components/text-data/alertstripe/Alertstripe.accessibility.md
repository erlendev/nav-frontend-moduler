
Accessibility på alertstripene er under arbeid.

Advarsel-stripen trenger aria-varsling, som gjør at skjermleserbrukere får lest dem opp automatisk, uten at brukeren må bla frem til innholdet. Bra hvis du legger inn aria-varsling selv til dette er rettet i Designsystemet.
Legg til en role="alert" på div-en.
  

Avhengig av kontekst bør du vudere om også de andre stripene trenger en aria-varsling. Bare spør spørsmålet: Er det viktig at en bruker får med seg informasjonen som kommer opp i stripen? Hvis ja, bør den ha en varsling. Hvis det mer er tilleggsinformasjon, må stripen ikke ha en aria-varsling.


Relevante krav:
- [WCAG-kriterium 1.3.1 Informasjon og relasjoner, nivå A](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden/131-informasjon-og-relasjoner-niva)
- [WCAG-kriterium 4.1.2 Navn, rolle, verdi, nivå A](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden/412-navn-rolle-verdi-niva)