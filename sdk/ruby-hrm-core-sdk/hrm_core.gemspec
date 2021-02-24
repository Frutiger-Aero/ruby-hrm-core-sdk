# frozen_string_literal: true

lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'hrm_core/version'

Gem::Specification.new do |spec|
  spec.name          = 'hrm_core'
  spec.version       = HrmCore::VERSION
  spec.authors       = ['']
  spec.email         = ['']

  spec.summary       = 'hrm core sdk for ruby'
  spec.description   = 'hrm core sdk for ruby'
  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'grpc', '~> 1.22.0'
  spec.add_dependency 'dry-monads', '~> 1.2'

  spec.add_development_dependency 'bundler', '~> 2.0'
  spec.add_development_dependency 'grpc-tools', '~> 1.22.0'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec', '~> 3.0'
  spec.add_development_dependency 'solargraph', '~> 0.34.2'
end
