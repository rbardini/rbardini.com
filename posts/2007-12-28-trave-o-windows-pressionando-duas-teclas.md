---
lang: pt-BR
---

2007-12-28T00:09:09-02:00
# Trave o Windows pressionando duas teclas

Tá certo que alguns usuários conseguem travar o Windows sem pressionar nenhuma tecla, clicando no _[fotos.exe](http://desciclo.pedia.ws/wiki/Fotos_da_Festa)_ do [Orkut](http://www.orkut.com/), mas a querida Microsoft, querendo disponibilizar a dor de cabeça para todos, incluiu uma [função interessante](http://support.microsoft.com/kb/244139) em seus sistemas operacionais. O erro é um "recurso" que permite que um arquivo de despejo de memória seja gerado utilizando o teclado, ou o que quer que isso signifique, resultando numa tela azul da morte com a mensagem _"O usuário final gerou o despejo de memória manualmente."_

Para habilitá-lo, abra o _regedit_ (lembrando que editar o registro pode gerar problemas e eu não me responsabilizo) e navegue até as seguintes chaves:

_HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\kbdhid\Parameters_  
Caso seu teclado seja USB, ou...

_HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\i8042prt\Parameters_  
...caso seja PS/2.

Crie um _DWORD_ chamado _CrashOnCtrlScroll_, com valor 1, e reinicie o computador. Agora, para travar tudo, segure a tecla _CTRL_ e pressione a tecla _Scroll Lock_ duas vezes, e tcharam! Aproveite sua [BSOD](http://pt.wikipedia.org/wiki/BSOD) novinha em folha. Mais uma da série de coisas úteis de se fazer no computador dos outros. E não, eu não tentei fazer isso aqui.

<small>Fonte: [the How-To Geek](http://www.howtogeek.com/howto/windows-vista/keyboard-ninja-kill-windows-with-the-blue-screen-of-death-in-3-keystrokes/)</small>
