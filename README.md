# mongoPractice
Notes and examples on mongo and express for future projects.
This repository is for my own reference.


# Mongo Notes

nodeJS 

Useful dependencies
	bcryptjs
	  encrypting password
	jsonwebtoken
		making user tokens
	bluebird
		recommended promise library
	validator
		useful for validating requests such as email
	mongoose
		useful mongodb middleware
	lodash
		reduces a lot of work related to data manipulation
		
mongodb

Setting up db directory and running
	from ~/mongo/bin
	./mongod —dbpath ~/mongo-data


# Deployment Notes

SSH keys

to look at ssh folder
	ls -al ~/.ssh
to generate ssh key
	ssh-keygen -t rsa -b 4096 -C ‘email@gmail.com’
		Don’t modify settings
		id_rsa is private key
		id_rsa.pub is public key
getting process id
	eval “(ssh-agent -s)”
let the machine know about public/private key pair
	ssh-add ~/.ssh/id_rsa
communicating with github
	ssh -T git@github.com

Heroku

to get help
	heroku —help
get all heroku configurations
	heroku config
get all logs from server
	heroku logs
to login to heroku account
	heroku login
to connect ssh keys
	heroku keys:add
to check heroku keys
	heroku keys
to remove heroku keys
	heroku keys:remove emailrelated@gmail.com
to test connection
	ssh -v git@heroku.com
		check for authentication succeeded
to check computer’s env variable
	env
set environment variable in app
	ex) Node.js: process.env.PORT || 3000;
set start script in app
	ex) Node.js: “start”: “node server.js” //inside package.json
run app
	npm start
deploying to heroku
	git add -A
	git commit -m “first deployment”
	heroku create
	git push heroku
adding mLab for mongo
	heroku addons:create mongolab:sandbox
Adding env variables
	heroku config:set NAME=Scott
	heroku config:get NAME
	heroku config:unset NAME
MONGODB_URI
	mongodb://heroku_kqv0zxd2:498gdj1757mok70l72tibt1vr1@ds153239.mlab.com:		53239/heroku_kqv0zxd2
	POST address: 53239
	db address: ds153239.mlab.com
	Authentication db name: heroku_kqv0zxd2
	Authentication user name: heroku_kqv0zxd2
	Authentication pw: 498gdj1757mok70l72tibt1vr1
	






