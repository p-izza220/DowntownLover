require 'sinatra'
require 'sendgrid-ruby'

get '/' do
  @script = "js/main.js"
	@style = "css/default.css"
	@title = "Home - DTL"
	erb :home	
end

get '/about' do 
  @script = "js/main.js"
	@style = "css/style.css"
	@title = "About - DTL"
	erb :about
end

get '/contact' do
  @script = "js/contact.js"
	@style = "css/style.css"
	@title = "Contact - DTL"
	erb :contact
end

get '/gallery' do
  @script = "js/main.js"
	@style = "css/style.css"
	@title = "Shop - DTL"
	erb :gallery
end

post '/contact' do
  @script = "js/contact.js"
  @style = "css/style.css"
  @title = "Contact - DTL"

  @error = []
  if /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ =~ params[:email]

  mail = SendGrid::Mail.new( 
    SendGrid::Email.new(email: "dev4mc@gmail.com"),
    "Thanks for contacting Downtown Lover",
    SendGrid::Email.new(email: params[:email] ),
    SendGrid::Content.new(type: 'text/plain', value: <<-EMAILCONTENTS
      Greetings #{params[:name]},

      Thanks for letting us know how you feel.

      Our team will be in contact with you shortly.  

      For your records here's a copy of the feedback that we have recieved:
      
      ---------------------------------
      
      #{params[:message]}
EMAILCONTENTS
      )
  )
  sg = SendGrid::API.new( api_key: ENV['SENDGRID_API_KEY'] )

  response = sg.client.mail._('send').post(request_body: mail.to_json)

  @msg = "Message sent. Thank you."
  puts response.status_code
  puts response.body
  puts response.headers
else
  @msg = "E-mail is invalid, please try again."
  @error.push( 'email' )
end
  # end email check

  erb :contact
end