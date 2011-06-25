require File.dirname(__FILE__) + '/spec_helper'

describe TheApp do
  include Rack::Test::Methods

  def app
    @app ||= TheApp
  end

  describe '#root' do
    it 'should return success' do
      get '/'
      last_response.should be_ok
    end
  end
end
