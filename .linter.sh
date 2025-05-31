#!/bin/bash
cd /home/kavia/workspace/code-generation/elitecareermatch-26395-5f205d01/elitecareer_match
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

