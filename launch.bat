@echo off
@title Amethyst v117.2
set CLASSPATH=.;dist\*
java -server -Dnet.sf.odinms.wzpath=wz server.Start
pause