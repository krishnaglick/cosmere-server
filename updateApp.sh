#!/bin/bash
ssh 107.170.78.145 -l root << 'ENDSSH'
cd ~/cosmere-server
git pull origin-ssh master
yarn
npm start
ENDSSH