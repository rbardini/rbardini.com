---
lang: pt-BR
---

2008-08-22T18:08:12-03:00
# Como colocar e estilizar Gravatars nos comentários do WordPress sem plugins

Há um tempo atrás [publiquei um artigo](/implantando-gravatar-no-wordpress) que tratava sobre a implementação de Gravatars no WordPress utilizando o plugin [WP-Gravatar](http://wordpress.org/extend/plugins/wp-gravatar/). Como disse na época, essa _feature_ logo se tornaria nativa do sistema, tornando desnecessário o uso de plugins para tal. Portanto, resolvi criar um novo tutorial sobre como colocar Gravatars nos comentários de seu tema nativamente e estilizá-los usando CSS. Ficou um pouco longo mas é porque tentei ser o mais específico possível; o procedimento é bem fácil e rápido.

O tema que vou usar como exemplo é o [Kubrick](http://binarybonsai.com/kubrick/), padrão do WordPress. Como os avatares serão exibidos nos comentários, o arquivo a ser editado é obviamente o `comments.php`. A partir da linha 27 encontra-se o seguinte:

```php
<?php foreach ($comments as $comment) : ?>

<li <?php echo $oddcomment; ?>id="comment-<?php comment_ID() ?>">
  <?php echo get_avatar( $comment, 32 ); ?>
  <?php printf(__('<cite>%s</cite> Says:', 'kubrick'), get_comment_author_link()); ?>
  <?php if ($comment->comment_approved == '0') : ?>
  <em><?php _e('Your comment is awaiting moderation.', 'kubrick'); ?></em>
  <?php endif; ?>
  <br />

  <small class="commentmetadata"><a href="#comment-<?php comment_ID() ?>" title=""><?php printf(__('%1$s at %2$s', 'kubrick'), get_comment_date(__('F jS, Y', 'kubrick')), get_comment_time()); ?></a> <?php edit_comment_link(__('edit', 'kubrick'),'&nbsp;&nbsp;',''); ?></small>

  <?php comment_text() ?>

</li>
```

Esse código corresponde a cada comentário exibido pelo WordPress; logo, a chamada para o Gravatar deve estar dentro da mesma. De fato está, ali na linha 30:

```php
<?php echo get_avatar( $comment, 32 ); ?>
```

Dando uma olhada na página [Using Gravatars](http://codex.wordpress.org/Using_Gravatars#Theme_Support_for_WordPress_2.5) do [WordPress Codex](http://codex.wordpress.org/), a função para exibir Gravatars é a seguinte:

```php
<?php echo get_avatar( $id_or_email, $size = '96', $default = '<path_to_url>' ); ?>
```

Onde:

- `$id_or_email`: ID ou e-mail do autor do comentário. Na maioria dos _templates_ pode ser substituido por `$comment`, como no exemplo acima.
- `$size` (opcional): Tamanho do avatar, com no máximo 512 (pixels). No exemplo é utilizado 32, mas o padrão é 96.
- `$default` (opcional): URL do avatar padrão a ser exibido quando o autor do comentário não tem um Gravatar. Se em branco, como em nosso exemplo, o [padrão](http://www.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536) será utilizado.

Aqui no blog, uso os seguintes parâmetros:

```php
<?php echo get_avatar( $comment, 40 ); ?>
```

Prefiro deixar o parâmetro `$default` em branco e utilizar o _Wavatar_ nas opções de discussão do WordPress, que gera um avatar aleatório quando o autor não tem Gravatar. Há também o _MonsterID_ que gera monstros (ORLY?) e o _Identicon_, que gera figuras geométricas baseadas no IP de origem do comentário. O _Identicon_ parece ser o recomendado pelo WordPress.

Resumindo, em geral basta colocar o código semelhante ao meu logo acima da linha onde há a função `comment_author_link()` ou `get_comment_author_link()`, alterando, caso queira, o parâmetro de tamanho da imagem, que no meu caso é 40 pixels. Lembrando que é necessário ativar a exibição de avatares no painel do WordPress indo em _Configurações > Discussão > Exibição do avatar > Mostrar avatares_.

Em relação à estilização, o próprio WordPress facilita bastante, já que as imagens dos avatares têm classe `avatar` – bem sugestivo, diga-se de passagem. No exemplo abaixo, o avatar gerado para o Sr. WordPress, dono do primeiro comentário de cada blog WordPress :P

```php
<img alt='' src='http://www.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=32' class='avatar avatar-32 avatar-default' height='32' width='32' />
```

Nota-se que a imagem tem mais de uma classe além da `avatar`, para outras finalidades que não vêm ao caso nesse artigo e geralmente são desprezadas. Sendo assim, é só escrever em seu `style.css` o código baseando-se nessa classe, como no tema _default_ do WordPress:

```css
.commentlist li .avatar {
  float: right;
  border: 1px solid #eee;
  padding: 2px;
  background: #fff;
}
```

O código acima coloca a imagem à direita do comentário. No meu caso, o avatar fica à esquerda, então é só trocar a propriedade `float: right` para `float: left`. O resultado todo mundo já sabe:

![Gravatars nos comentários](/img/comentarios-gravatar.png)

Qualquer dúvida, ou se quiser ver como ficou o resultado aqui no blog, comente :)
