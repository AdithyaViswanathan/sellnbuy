FROM server
   
ENV JWT_SECRET=restinpeace SUPER_ADMIN_EMAIL=admin@admin.com SUPER_ADMIN_PASSWORD=adminadmin

EXPOSE 8000:8000
ENTRYPOINT ['./server/wait.sh']
VOLUME [ "./server:/app" ] 