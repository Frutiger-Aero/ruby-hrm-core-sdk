# frozen_string_literal: true

require 'securerandom'
require 'spec_helper'

RSpec.describe HrmCore::HrmApi::Client do
  subject { described_class.new(addr, access_token) }

  let(:addr) { '127.0.0.1' }
  let(:access_token) { 'access_token' }

  let(:metadata) { { metadata: { token: access_token } } }

  describe '#create_contractor' do
    let(:params) do
      {
        userId: '',
        status: '',
        workStatus: '',
        rating: 4.8,
        regionId: ''
      }
    end

    context 'success' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractorService::Stub)
          .to receive(:create)
          .and_return(::Hrm::Core::Contractor.new)
      end

      it 'calls service and handle response' do
        resp = subject.create_contractor(params)
        expect(resp.success).to include(:id)
      end
    end

    context 'exceptions' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractorService::Stub)
          .to receive(:create)
          .and_raise(StandardError, 'failure')
      end

      it 'returns failure' do
        resp = subject.create_contractor(params)
        expect(resp.failure).to eq('failure')
      end
    end
  end

  describe '#update_contractor' do
    let(:params) do
      {
        id: SecureRandom.uuid,
        userId: '',
        status: '',
        workStatus: '',
        rating: 4.8,
        regionId: ''
      }
    end

    context 'success' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractorService::Stub)
          .to receive(:update)
          .and_return(::Hrm::Core::Contractor.new)
      end

      it 'calls service and handle response' do
        resp = subject.update_contractor(params)
        expect(resp.success).to include(:id)
      end
    end

    context 'exceptions' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractorService::Stub)
          .to receive(:update)
          .and_raise(StandardError, 'failure')
      end

      it 'returns failure' do
        resp = subject.update_contractor(params)
        expect(resp.failure).to eq('failure')
      end
    end
  end

  describe '#block_contractor' do
    let(:params) do
      {
        id: SecureRandom.uuid,
        reason: {
          id: SecureRandom.uuid
        }
      }
    end

    context 'success' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractorService::Stub)
          .to receive(:block)
          .and_return(::Hrm::Core::Contractor.new)
      end

      it 'calls service and handle response' do
        resp = subject.block_contractor(params)
        expect(resp.success).to include(:id)
      end
    end

    context 'exceptions' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractorService::Stub)
          .to receive(:block)
          .and_raise(StandardError, 'failure')
      end

      it 'returns failure' do
        resp = subject.block_contractor(params)
        expect(resp.failure).to eq('failure')
      end
    end
  end

  describe '#create_contract' do
    let(:params) do
      {
        grade: {
          id: SecureRandom.uuid
        },
        wage: {
          id: SecureRandom.uuid
        },
        contractor: {
          id: SecureRandom.uuid
        },
        skills: nil
      }
    end

    context 'success' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractService::Stub)
          .to receive(:create)
          .and_return(::Hrm::Core::Contract.new)
      end

      it 'calls service and handle response' do
        resp = subject.create_contract(params)
        expect(resp.success).to include(:id)
      end
    end

    context 'exceptions' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractService::Stub)
          .to receive(:create)
          .and_raise(StandardError, 'failure')
      end

      it 'returns failure' do
        resp = subject.create_contract(params)
        expect(resp.failure).to eq('failure')
      end
    end
  end

  describe '#update_contract' do
    let(:params) do
      {
        grade: {
          id: SecureRandom.uuid
        },
        wage: {
          id: SecureRandom.uuid
        },
        contractor: {
          id: SecureRandom.uuid
        },
        skills: nil
      }
    end

    context 'success' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractService::Stub)
          .to receive(:update)
          .and_return(::Hrm::Core::Contract.new)
      end

      it 'calls service and handle response' do
        resp = subject.update_contract(params)
        expect(resp.success).to include(:id)
      end
    end

    context 'exceptions' do
      before do
        allow_any_instance_of(::Hrm::Core::ContractService::Stub)
          .to receive(:update)
          .and_raise(StandardError, 'failure')
      end

      it 'returns failure' do
        resp = subject.update_contract(params)
        expect(resp.failure).to eq('failure')
      end
    end
  end
end
