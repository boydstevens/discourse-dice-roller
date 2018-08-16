# name: discourse-dice-roller
# about: Allows users to roll dice as part of thier post, with protections against editing or modifying results.  
# version: 0.0.5
# authors: Arkaal

#register_asset "stylesheets/diceroller.scss"

DICEROLLER_PLUGIN_NAME ||= "diceroller".freeze

enabled_site_setting :dieroll_enabled

after_initialize do
  module ::Diceroller
    class Engine < ::Rails::Engine
      engine_name DICEROLLER_PLUGIN_NAME
      isolate_namespace Diceroller
    end
  end

  class ::Diceroller::DicerollerController < ApplicationController
    before_action :verify_post_and_user, only: :update

    def update
      dierolls.toggle_user(current_user)
      respond_with_retort
    end

    private

    def post
      @post ||= Post.find_by(id: params[:post_id]) if params[:post_id]
    end

    def dierolls
      @dierolls ||= Diceroller::Diceroller.find_by(post: post, retort: params[:retort])
    end

    def verify_post_and_user
      respond_with_unprocessable("Unable to find post #{params[:post_id]}") unless post
      respond_with_unprocessable("You are not permitted to modify this") unless current_user
    end

    def serialized_post_rolls
      ::PostSerializer.new(post.reload, scope: Guardian.new, root: false).as_json
    end

    def respond_with_unprocessable(error)
      render json: { errors: error }, status: :unprocessable_entity
    end
  end

  class ::Diceroller::DierollSerializer < ActiveModel::Serializer
    attributes :post_id, :rolls, :results
    define_method :post_id,   -> { object.post_id }
    define_method :rolls, -> { object.persisted? ? JSON.parse(object.value) : [] }
    define_method :results,     -> { object.key.split('|').first }
  end

  ::Diceroller::Dicerolls = Struct.new(:detail) do

    def self.for_post(post: nil)
      PostDetail.where(extra: DICEROLLER_PLUGIN_NAME,
                       post: post)
    end

    def self.find_by(post: nil, retort: nil)
      new(for_post(post: post).find_or_initialize_by(key: :"#{retort}|#{DICEROLLER_PLUGIN_NAME}"))
    end

    def valid?
      detail.valid?
    end

    def value
      return [] unless detail.value
      @value ||= Array(JSON.parse(detail.value))
    end
  end

  require_dependency 'post_serializer'
  class ::PostSerializer
    attributes :dierolls

    def dierolls
      return ActiveModel::ArraySerializer.new(Diceroller::Dicerolls.for_post(post: object), each_serializer: ::Diceroller::DierollSerializer).as_json
    end
  end
end