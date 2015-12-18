Rails.application.config.middleware.use OmniAuth::Builder do 
	provider :google_oauth2,'1009565918769-468d2vg3bavuc0pe9fk3hmi6kmb9o1gm.apps.googleusercontent.com', 'g6f4axlB2XHkSrVKHtfrDDoS',{
		:skip_jwt => true,
		hd: 'usach.cl'
	}
end