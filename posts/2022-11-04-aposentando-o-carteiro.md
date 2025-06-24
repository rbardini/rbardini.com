2022-11-04 02:06:25+01:00
# Aposentando o Carteiro

Há 10 anos, eu estava ainda na faculdade. Tinha acabado de comprar meu primeiro smartphone—um Motorola Milestone usado—e queria justificar o investimento aprendendo a desenvolver aplicativos Android. Escolhi criar um rastreador de encomendas, por necessidade pessoal, por não encontrar uma alternativa satisfatória, e pelos dados dos objetos serem publicamente acessíveis[^1].

Em abril de 2012, o [Carteiro era lançado](/notas-de-lancamento/).

<figure>
  <img src="/img/carteiro/1-0-0-postal-list.png" alt="" />
  <figcaption>Lista de objetos no Carteiro 1.0.0</figcaption>
</figure>

Desde então, o aplicativo (que era pago) se tornou gratuito, o número de usuários cresceu expressivamente, foi recomandado por [diversas](https://www.techtudo.com.br/tudo-sobre/carteiro/) [publicações](https://www.baixaki.com.br/android/download/carteiro.htm) de tecnologia, destacado na Play Store entre produções brasileiras, e até mesmo participou do [pacote de aplicativos nacionais da LG](https://www.jusbrasil.com.br/diarios/79871944/dou-secao-1-11-11-2014-pg-51).

Uma constante ameaça durante todos esses anos, porém, foram os próprios Correios. Como não tenho empresa e, portanto, contrato com a ECT, não tenho acesso à API oficial de rastreamento. Isso me forçou a extrair dados de páginas web, migrar para APIs não oficiais, e/ou usar credenciais de teste para validar requisições. A completa falta de comunicação resultou muitas vezes na [interrupção do serviço](/carteiro-removido-temporariamente-da-play-store), que felizmente sempre consegui contornar. Bem, até agora.

Os Correios fecharam a última porta na semana passada, quando puxaram da tomada a API de seu [finado aplicativo móvel](https://play.google.com/store/apps/details?id=br.com.correios.srocorreios). Dessa forma, não há mais como o Carteiro buscar informações sobre o andamento das entregas, pelo menos não sem investir uma quantidade de tempo e recursos que não tenho à disposição no momento.

Apesar do sucesso, o Carteiro sempre foi um _hobby_, sem qualquer retorno financeiro significativo. Resisti a colocar propagandas, porque meu principal objetivo era criar um produto agradável, focado na experiência do usuário e respeitando sua privacidade. Mas como a maioria dos meus hobbies, eventualmente me cansei dele. Não apenas isso, hoje tenho diferentes prioridades, e pouca motivação para contribuir conteúdo aos jardins murados de gigantes da tecnologia.

Chegou a hora do Carteiro pendurar o boné e ter um merecido descanso. A todos os destinatários e remetentes que confiaram no meu trabalho, meu sincero muito obrigado. E quem sabe, abrindo o código-fonte do projeto e com apoio da comunidade, ele não faça uma nova tentativa de entrega?

Um abraço!

Rafael Bardini

> **Atualização 21/05/2023:** o código-fonte do Carteiro foi [liberado](/codigo-fonte-carteiro-liberado).

[^1]: Lembra do [SRO](https://web.archive.org/web/20120108230723/http://websro.correios.com.br:80/sro_bin/txect01$.QueryList?P_LINGUA=001&P_TIPO=001&P_COD_UNI=SI054542659BR)?

`lang:pt-BR` `carteiro`
