2008-01-16 03:14:30-02:00
# Implantando Gravatar no WordPress

Sempre gostei da idéia de exibir avatares dentro dos comentários, dando uma "humanizada" na relação entre o blogueiro e seus leitores. O problema é que não existe um padrão quanto a isso, já que nem todo mundo tem uma conta no [Gravatar](http://site.gravatar.com/), [MyBlogLog](http://www.mybloglog.com/) ou [BlogBlogs](http://blogblogs.com.br/). Por esse motivo, alguns recomendam exibir o _favicon_ do site ao invés do avatar, utilizando plugins como o [Favatars](http://wordpress.org/extend/plugins/favatars/). Mas isso traz outro problema: nem todos têm um site pessoal.

Com a compra da [Gravatar](http://site.gravatar.com/) pela [Automattic](http://automattic.com/), mantenedora do WordPress, a situação muda de figura. Como o WordPress é a plataforma líder entre os blogs, e provavelmente virá com Gravatars embutidos nas próximas versões, o sistema se popularizará bastante. Foi então que finalmente decidi implantá-lo aqui. Diferentemente da [dica do pBlog](http://www.pblog.com.br/2008/01/11/habilite-gravatars-nos-comentarios-do-seu-blog/), instalei o plugin [WP-Gravatar](http://wordpress.org/extend/plugins/wp-gravatar/) para tal tarefa, até porque eu estava com preguiça de editar o código-fonte. O WP-Gravatar é compatível com Gravatar (d'oh!), MyBlogLog e também _favicons_, caso o usuário não tenha nenhum dos dois anteriores, além de fornecer a opção de exibir um pequeno avatar no início de cada artigo, útil para blogs com mais de um autor.

O único trabalho foi criar uma imagem padrão para ser exibida quando a pessoa não tem nenhuma identificação, que você poderá visualizar comentando. :)

`lang:pt-BR`
