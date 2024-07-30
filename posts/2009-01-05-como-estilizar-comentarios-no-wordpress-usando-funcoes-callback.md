---
date: '2009-01-05T18:42:33-02:00'
lang: pt-BR
---

# Como estilizar comentários no WordPress usando funções callback

A mudança mais visível no WordPress 2.7, além da nova área de administração, é a maneira como se manipula os comentários. Hoje temos como responder comentários — que vão se aninhando conforme o nível da discussão — e agrupá-los por página automaticamente, pra não ficar aquela lingüiçona quando se tem 500 comentários. :P

Póórem, como nem tudo nas flores são vida, essa atualização facilitou e complicou a vida de quem produz temas para WordPress. Como? Foi implementada a função `wp_list_comments` que substitui todo aquele _loop_ feioso dentro do _comments.php_. Agora, cada comentário é "manufaturado" pelo WordPress, ou seja, vem como um "bloco" pronto pra consumo: avatar, nome do autor, data de envio, o comentário propriamente dito e o link para resposta, nessa ordem. Mas e se eu quiser adicionar outros elementos ou mudar a ordem dos atuais?

Sim, foram colocadas várias tags com [diversas classes](http://codex.wordpress.org/Migrating_Plugins_and_Themes_to_2.7/Enhanced_Comment_Display#CSS_Styling) na maioria dos elementos, mas elas podem não ser o suficiente. É aí que entram as funções de _callback_. Com elas, é possível contornar as limitações da função padrão, permitindo alterar completamente o tal bloco que falei acima. Para isso, usaremos o arquivo _functions.php_ do tema desejado. Nele, colocaremos a função _callback_ que mudará a forma como a função `wp_list_comments` junta e exibe os dados.

A função padrão, traduzida em miúdos, é a mais ou menos a seguinte:

```php
<?php
function custom_comments($comment, $args, $depth) {
  $GLOBALS['comment'] = $comment; ?>
  <li <?php comment_class() ?> id="comment-<?php comment_ID() ?>">
    <div id="div-comment-<?php comment_ID(); ?>">
      <div class="comment-author vcard">
        <?php if ($args['avatar_size'] != 0) echo get_avatar($comment, $args['avatar_size'], $default); ?>
        <?php printf(__('<cite class="fn">%s</cite> <span class="says">says:</span>'), get_comment_author_link()) ?>
      </div>
      <?php if ($comment->comment_approved == '0') : ?>
        <em><?php _e('Your comment is awaiting moderation.') ?></em>
        <br />
      <?php endif; ?>

      <div class="comment-meta commentmetadata">
        <a href="<?php echo htmlspecialchars(get_comment_link($comment->comment_ID)) ?>"><?php printf(__('%1$s at %2$s'), get_comment_date(),  get_comment_time()) ?></a>
        <?php edit_comment_link(__('(Edit)'),'  ','') ?>
      </div>

      <div class="comment-text">
        <?php comment_text() ?>
      </div>

      <div class="reply">
        <?php comment_reply_link(array_merge($args, array('add_below' => 'div-comment', 'depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
      </div>
    </div>
<?php } ?>
```

Algumas considerações:

- Veja que na linha 20 há uma div com classe `comment-text`. Essa div não está presente quando se utiliza a função `wp_list_comments`. Pois é, o pessoal da Automattic colocou tags até no textinho "[Fulano] disse", mas não botou nada pra representar o conteúdo do comentário... Enfim, essa tag não é indispensável, mas facilita bastante em algumas ocasiões, como na utilização de _speech bubbles_ (balões de fala) nos comentários — assunto para um próximo artigo.
- Repare também que a tag `li` do início não é fechada; o WordPress toma conta de fechá-la automaticamente ao final de cada comentário.

Voltando ao raciocínio, basta adicionar essa função no arquivo _functions.php_ e, no arquivo _comments.php_, chamar a função `wp_list_comments` da seguinte maneira:

```php
<?php wp_list_comments('callback=custom_comments'); ?>
```

Agora, basta modificar a função `custom_comments` do mesmo modo como se fazia na era pré-WordPress 2.7: adicione, remova e organize os elementos como bem entender, do mesmo modo como eu adicionei a div `.comment-text` para isolar o conteúdo do comentário e facilitar a estilização por meio de CSS.

Com funções _callback_ fica fácil, por exemplo, separar comentários de trackbacks, bastando apenas chamar a mesma função mas com argumentos diferentes. A função para listar somente trackbacks ficariam assim:

```php
<?php
function custom_trackbacks($comment, $args, $depth) {
  $GLOBALS['comment'] = $comment; ?>
  <li id="comment-<?php comment_ID(); ?>"><?php comment_author_link(); ?>
<?php } ?>
```

E as chamadas no arquivo _comments.php_:

```php
  <?php if (!empty($comments_by_type['comment'])) : ?>
    <h4>Comentários</h4>
    <ol class="commentlist">
      <?php wp_list_comments('type=comment&callback=custom_comments'); ?>
    </ol>
  <?php endif; ?>

  <?php if (!empty($comments_by_type['pings'])) : ?>
    <h4>Trackbacks</h4>
    <ol class="trackbacklist">
      <?php wp_list_comments('type=pings&callback=custom_trackbacks'); ?>
    </ol>
  <?php endif; ?>
```

[Esse tutorial](http://sivel.net/2008/10/wp-27-comment-separation/) (em inglês) explica mais detalhadamente como separar comentários de trackbacks. Vale a visita :P
