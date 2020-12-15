#!/bin/bash

if [ -f ${CONFIG_PATH} ]
then
    source ${CONFIG_PATH}
fi
for var in "${!REWRITE_@}"; do
    eval "export $(printf '%s=\"%s\"\n' "${var/REWRITE_/}" "${!var}")"
    echo "Rewritten ${var/REWRITE_/} from env ${var}"
done

if [ $# -eq 0 ]
then
    echo "Auto run"
    npm run typeorm:migrate &&\
      echo "Done migration" &&\
      exec npm run start:prod
else
    echo "Custom run"
    $@
fi
