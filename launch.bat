@echo off
@title Amethyst v117
set CLASSPATH=.;dist\*
java -client -Dnet.sf.odinms.wzpath=wz server.Start
pause