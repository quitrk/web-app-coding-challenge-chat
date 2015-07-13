# app-jobs-post-process-worker
Worker that post processes new jobs (e.g. clean, fill in geo information, estimate prices and store them in the db)


Environment Variables:
- GM_GEOCODER_API_KEY
- DISPATCHER_MONGODB_CONNECTION_STRING
- DISPATCHER_AMQP_URL
