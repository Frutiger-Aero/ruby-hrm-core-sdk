# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: proto/common.proto

require 'google/protobuf'

require_relative 'position_pb'

Google::Protobuf::DescriptorPool.generated_pool.build do
  add_file("proto/common.proto", :syntax => :proto3) do
    add_message "hrm.core.Grade" do
      optional :id, :string, 1
      optional :position, :message, 2, "hrm.core.PositionRelation"
      optional :rate, :message, 3, "hrm.core.Rate"
      repeated :compensations, :message, 4, "hrm.core.Compensation"
    end
    add_message "hrm.core.GradeRelation" do
      optional :id, :string, 1
    end
    add_message "hrm.core.Rate" do
      optional :amount, :int32, 1
      optional :type, :string, 2
      optional :unit, :string, 3
    end
    add_message "hrm.core.Compensation" do
      optional :id, :string, 1
      optional :amount, :int32, 2
      optional :type, :string, 3
      optional :option, :string, 4
    end
  end
end

module Hrm
  module Core
    Grade = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("hrm.core.Grade").msgclass
    GradeRelation = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("hrm.core.GradeRelation").msgclass
    Rate = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("hrm.core.Rate").msgclass
    Compensation = ::Google::Protobuf::DescriptorPool.generated_pool.lookup("hrm.core.Compensation").msgclass
  end
end
