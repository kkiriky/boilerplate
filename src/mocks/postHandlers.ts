import { rest } from 'msw';

export const postHandlers = [
  rest.get('/api/post', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(loremMarkdown));
  }),
];

const loremMarkdown = `# Oves ille vultum

## Tenues parva alimentaque hunc pignora iactum mixta

Lorem markdownum superbia cruor; quas ac lampadibus labore. Inque *tumentibus
talibus vocatur*, poenas et tunc et matrisque illius *humi*; primaeque. Auxilium
sedet; ille abditus, audax miserrima pererrant videbis spectemur ferunt
contingere e linguae tamen a.

## Ipse et tutus vix est adsiduae orbem

Sparsaque poma corpora fer. Vestigia aut simul cecidit, praeduraque freta
Tonantis dementia longo defuit pallada carmina quam, sine et! Dixit pedibus
deprensi, tum dixit induruit.

## Nostro ora mihi nisi hunc et amor

Ducebat species auro deferre hospes est decus acta data, **amas pennatis**.
Sagittifera oculos! In formosa Clymeni arcet puro belloque dolet intrare nondum
data durata vellera. Cur de dentes et moles valles **hanc** ultima, sit illa.
[Sanguine Austri](http://qualia.net/de) ventis nomen namque exit ager captabat
mitra, bene cui spatium; quam specto.

1. Deam undas gratata Minyis
2. Articulos narrat securosque nostro
3. Culpa ad virgine
4. Quae gentis

## Circumdata unum

Tardis levavit fama ubi tellusque matrem miracula sorores: pretium *ventorum
legem* deviaque tota tracto de **carmine**. Partes sincerumque, Aeolon rauco.
Triennia *Medusae praevisos licet* exstinctus: crura tolle, modo luctu vinci
Amphitryoniadae loquendo; **Castalio**. O guttae dedisti et inquit quamvis
paulatim flammas [vellet](http://submergere.org/illos), equidem perenni. Nunc
pericula me tristitiam in obruta, virtute partes *cogeret*.

> Iubas quem resolvit sanguine matrem. Ait simul, et
> [amento](http://laniavit.com/qui.html) laudis et spirarunt et frondes in Venus
> sub nolis absit pharetra attonuit vim? Auditas ferro e proculcat trunci putat,
> et fusca ex deposuit revincta, mater.

Hastile teli Pallantias adfecit dignabere alternis facti, forti atris. Murmur
*nequiquam* ignibus optandi fumantia voluntas bracchia solidissima vestra
premeret.`;
