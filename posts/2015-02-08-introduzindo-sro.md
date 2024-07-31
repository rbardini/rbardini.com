---
lang: pt-BR
---

2015-02-08T18:13:20-02:00
# Introduzindo: SRO

Acabo de publicar no registro do npm o [SRO](https://www.npmjs.com/package/sro), um módulo para rastreamento de objetos postais utilizando a API oficial dos Correios[^1].

Os principais objetivos desse projeto são validar os códigos entrados, agrupar as requisições e normalizar as respostas, facilitando o desenvolvimento de aplicações que necessitem desse tipo de informação. Como um bônus, o SRO também pode ser utilizado pela linha de comando, com os dados sendo apresentados em formato de tabela ou JSON.

O repositório também está [disponível no GitHub](https://github.com/rbardini/sro). Algumas coisas ainda faltam, como testes e suporte a credenciais, mas espero conseguir trabalhar nisso durante as próximas semanas.

[^1]: Por mais que "oficial" nesse contexto signifique "escondida em [algum PDF de uma área desconhecida](http://www.correios.com.br/para-voce/correios-de-a-a-z/pdf) do site oficial".
