require 'sinatra'

get '/' do
	@title = "Home - DTL"
	erb :home	
end

get '/about' do 
	@title = "About - DTL"
	erb :about
end

get '/contact' do
	@title = "Contact - DTL"
	erb :contact
end

get '/gallery' do
	@title = "Shop - DTL"
	erb :gallery
end