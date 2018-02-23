@echo off
@title Dump
set CLASSPATH=.;dist\MapleCrystal.jar;lib\mina-core.jar;lib\slf4j-api.jar;lib\slf4j-jdk14.jar;lib\mysql-connector-java-bin.jar
java -server -Dnet.sf.odinms.wzpath=wz tools.wztosql.DumpMobSkills
pause