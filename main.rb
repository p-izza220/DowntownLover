require 'sinatra'

get '/' do
	@style = "css/default.css"
	@title = "Home - DTL"
	erb :home	
end

get '/about' do 
	@style = "css/style.css"
	@title = "About - DTL"
	erb :about
end

get '/contact' do
	@style = "css/style.css"
	@title = "Contact - DTL"
	erb :contact
end

get '/gallery' do
	@style = "css/style.css"
	@title = "Shop - DTL"
	erb :gallery
end

post '/contact' do
  @title = "Contact XYZ"
  @msg = "Thanks for your submission"

  if /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ =~ params[:email]

  erb :contact

  mail = SendGrid::Mail.new( 
    SendGrid::Email.new(email: "dev4mc@gmail.com"),
    "Thanks for contacting Downtown Lover",
    SendGrid::Email.new(email: params[:email] ),
    SendGrid::Content.new(type: 'text/plain', value: <<-EMAILCONTENTS
      Greetings #{params[:name]},

      Thanks for letting us know how you feel.

      Our team will be in contact with you shortly.  

      For your records here's a copy of the feedback we recieved:
      
      ---------------------------------
      
      #{params[:message]}
EMAILCONTENTS
      )
  )
  sg = SendGrid::API.new( api_key: ENV['SENDGRID_API_KEY'] )

  response = sg.client.mail._('send').post(request_body: mail.to_json)

  @msg = "Thanks for your submission"
  puts response.status_code
  puts response.body
  puts response.headers
else
  @msg = "Something is wrong with your email, friend"
end
  # end email check

  erb :contact
end