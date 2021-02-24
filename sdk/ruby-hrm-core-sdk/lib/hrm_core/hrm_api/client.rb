# frozen_string_literal: true

require 'dry/monads'
require 'hrm_core/proto/contractor_services_pb'
require 'hrm_core/proto/contract_services_pb'

module HrmCore
  module HrmApi
    class Client
      include Dry::Monads[:result]

      def initialize(addr, token, cert = :default)
        @addr = addr
        @cert = cert
        @token = token
      end

      # CONTRACTOR
      def create_contractor(params)
        client = build_client(addr, cert, ::Hrm::Core::ContractorService::Stub)

        begin
          resp = client.create(
            ::Hrm::Core::ContractorCreateRequest.new(params),
            metadata
          )
        rescue StandardError => e
          return Failure(e.message)
        end
        Success(transform(resp))
      end

      def update_contractor(params)
        client = build_client(addr, cert, ::Hrm::Core::ContractorService::Stub)

        begin
          resp = client.update(
            ::Hrm::Core::ContractorUpdateRequest.new(params),
            metadata
          )
        rescue StandardError => e
          return Failure(e.message)
        end
        Success(transform(resp))
      end

      def block_contractor(params)
        client = build_client(addr, cert, ::Hrm::Core::ContractorService::Stub)

        begin
          resp = client.block(
            ::Hrm::Core::ContractorBlockRequest.new(params),
            metadata
          )
        rescue StandardError => e
          return Failure(e.message)
        end
        Success(transform(resp))
      end

      def activate_contractor(params)
        client = build_client(addr, cert, ::Hrm::Core::ContractorService::Stub)

        begin
          resp = client.activate(
            ::Hrm::Core::ContractorBlockRequest.new(params),
            metadata
          )
        rescue StandardError => e
          return Failure(e.message)
        end
        Success(transform(resp))
      end

      # CONTRACT
      def create_contract(params)
        client = build_client(addr, cert, ::Hrm::Core::ContractService::Stub)

        begin
          resp = client.create(
            ::Hrm::Core::ContractCreateRequest.new(params),
            metadata
          )
        rescue StandardError => e
          return Failure(e.message)
        end
        Success(transform(resp))
      end

      def update_contract(params)
        client = build_client(addr, cert, ::Hrm::Core::ContractService::Stub)

        begin
          resp = client.update(
            ::Hrm::Core::ContractUpdateRequest.new(params),
            metadata
          )
        rescue StandardError => e
          return Failure(e.message)
        end
        Success(transform(resp))
      end

      private

      attr_reader :addr, :client, :token, :cert

      def metadata
        @metadata ||= { metadata: { token: token } }
      end

      def build_client(addr, cert, stub)
        case cert
        when :insecure
          stub.new(addr, :this_channel_is_insecure)
        when :default
          stub.new(addr, GRPC::Core::ChannelCredentials.new)
        else
          stub.new(addr, cert)
        end
      end

      def transform(response)
        h = response.to_h
        h.each { |k, v| h[k] = transform(v) if v.is_a?(Hash) }
        h.transform_keys { |key| downcase_sym(key) }
      end

      def downcase_sym(word)
        word = word.to_s.gsub(/([A-Z\d]+)([A-Z][a-z])/, '\1_\2')
        word = word.gsub(/([a-z\d])([A-Z])/, '\1_\2')
        word = word.tr('-', '_')
        word = word.downcase
        word.to_sym
      end
    end
  end
end
