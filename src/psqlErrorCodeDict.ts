/* eslint-disable @typescript-eslint/naming-convention */
/**
 * https://www.postgresql.org/docs/13/errcodes-appendix.html
 */
export enum PGCodeCondition {
  'successful_completion' = 'successful_completion',
  'warning' = 'warning',
  'dynamic_result_sets_returned' = 'dynamic_result_sets_returned',
  'implicit_zero_bit_padding' = 'implicit_zero_bit_padding',
  'null_value_eliminated_in_set_function' = 'null_value_eliminated_in_set_function',
  'privilege_not_granted' = 'privilege_not_granted',
  'privilege_not_revoked' = 'privilege_not_revoked',
  'string_data_right_truncation' = 'string_data_right_truncation',
  'deprecated_feature' = 'deprecated_feature',
  'no_data' = 'no_data',
  'no_additional_dynamic_result_sets_returned' = 'no_additional_dynamic_result_sets_returned',
  'sql_statement_not_yet_complete' = 'sql_statement_not_yet_complete',
  'connection_exception' = 'connection_exception',
  'connection_does_not_exist' = 'connection_does_not_exist',
  'connection_failure' = 'connection_failure',
  'sqlclient_unable_to_establish_sqlconnection' = 'sqlclient_unable_to_establish_sqlconnection',
  'sqlserver_rejected_establishment_of_sqlconnection' = 'sqlserver_rejected_establishment_of_sqlconnection',
  'transaction_resolution_unknown' = 'transaction_resolution_unknown',
  'protocol_violation' = 'protocol_violation',
  'triggered_action_exception' = 'triggered_action_exception',
  'feature_not_supported' = 'feature_not_supported',
  'invalid_transaction_initiation' = 'invalid_transaction_initiation',
  'locator_exception' = 'locator_exception',
  'invalid_locator_specification' = 'invalid_locator_specification',
  'invalid_grantor' = 'invalid_grantor',
  'invalid_grant_operation' = 'invalid_grant_operation',
  'invalid_role_specification' = 'invalid_role_specification',
  'diagnostics_exception' = 'diagnostics_exception',
  'stacked_diagnostics_accessed_without_active_handler' = 'stacked_diagnostics_accessed_without_active_handler',
  'case_not_found' = 'case_not_found',
  'cardinality_violation' = 'cardinality_violation',
  'data_exception' = 'data_exception',
  'array_subscript_error' = 'array_subscript_error',
  'character_not_in_repertoire' = 'character_not_in_repertoire',
  'datetime_field_overflow' = 'datetime_field_overflow',
  'division_by_zero' = 'division_by_zero',
  'error_in_assignment' = 'error_in_assignment',
  'escape_character_conflict' = 'escape_character_conflict',
  'indicator_overflow' = 'indicator_overflow',
  'interval_field_overflow' = 'interval_field_overflow',
  'invalid_argument_for_logarithm' = 'invalid_argument_for_logarithm',
  'invalid_argument_for_ntile_function' = 'invalid_argument_for_ntile_function',
  'invalid_argument_for_nth_value_function' = 'invalid_argument_for_nth_value_function',
  'invalid_argument_for_power_function' = 'invalid_argument_for_power_function',
  'invalid_argument_for_width_bucket_function' = 'invalid_argument_for_width_bucket_function',
  'invalid_character_value_for_cast' = 'invalid_character_value_for_cast',
  'invalid_datetime_format' = 'invalid_datetime_format',
  'invalid_escape_character' = 'invalid_escape_character',
  'invalid_escape_octet' = 'invalid_escape_octet',
  'invalid_escape_sequence' = 'invalid_escape_sequence',
  'nonstandard_use_of_escape_character' = 'nonstandard_use_of_escape_character',
  'invalid_indicator_parameter_value' = 'invalid_indicator_parameter_value',
  'invalid_parameter_value' = 'invalid_parameter_value',
  'invalid_preceding_or_following_size' = 'invalid_preceding_or_following_size',
  'invalid_regular_expression' = 'invalid_regular_expression',
  'invalid_row_count_in_limit_clause' = 'invalid_row_count_in_limit_clause',
  'invalid_row_count_in_result_offset_clause' = 'invalid_row_count_in_result_offset_clause',
  'invalid_tablesample_argument' = 'invalid_tablesample_argument',
  'invalid_tablesample_repeat' = 'invalid_tablesample_repeat',
  'invalid_time_zone_displacement_value' = 'invalid_time_zone_displacement_value',
  'invalid_use_of_escape_character' = 'invalid_use_of_escape_character',
  'most_specific_type_mismatch' = 'most_specific_type_mismatch',
  'null_value_not_allowed' = 'null_value_not_allowed',
  'null_value_no_indicator_parameter' = 'null_value_no_indicator_parameter',
  'numeric_value_out_of_range' = 'numeric_value_out_of_range',
  'sequence_generator_limit_exceeded' = 'sequence_generator_limit_exceeded',
  'string_data_length_mismatch' = 'string_data_length_mismatch',
  //'string_data_right_truncation' = 'string_data_right_truncation',
  'substring_error' = 'substring_error',
  'trim_error' = 'trim_error',
  'unterminated_c_string' = 'unterminated_c_string',
  'zero_length_character_string' = 'zero_length_character_string',
  'floating_point_exception' = 'floating_point_exception',
  'invalid_text_representation' = 'invalid_text_representation',
  'invalid_binary_representation' = 'invalid_binary_representation',
  'bad_copy_file_format' = 'bad_copy_file_format',
  'untranslatable_character' = 'untranslatable_character',
  'not_an_xml_document' = 'not_an_xml_document',
  'invalid_xml_document' = 'invalid_xml_document',
  'invalid_xml_content' = 'invalid_xml_content',
  'invalid_xml_comment' = 'invalid_xml_comment',
  'invalid_xml_processing_instruction' = 'invalid_xml_processing_instruction',
  'duplicate_json_object_key_value' = 'duplicate_json_object_key_value',
  'invalid_argument_for_sql_json_datetime_function' = 'invalid_argument_for_sql_json_datetime_function',
  'invalid_json_text' = 'invalid_json_text',
  'invalid_sql_json_subscript' = 'invalid_sql_json_subscript',
  'more_than_one_sql_json_item' = 'more_than_one_sql_json_item',
  'no_sql_json_item' = 'no_sql_json_item',
  'non_numeric_sql_json_item' = 'non_numeric_sql_json_item',
  'non_unique_keys_in_a_json_object' = 'non_unique_keys_in_a_json_object',
  'singleton_sql_json_item_required' = 'singleton_sql_json_item_required',
  'sql_json_array_not_found' = 'sql_json_array_not_found',
  'sql_json_member_not_found' = 'sql_json_member_not_found',
  'sql_json_number_not_found' = 'sql_json_number_not_found',
  'sql_json_object_not_found' = 'sql_json_object_not_found',
  'too_many_json_array_elements' = 'too_many_json_array_elements',
  'too_many_json_object_members' = 'too_many_json_object_members',
  'sql_json_scalar_required' = 'sql_json_scalar_required',
  'integrity_constraint_violation' = 'integrity_constraint_violation',
  'restrict_violation' = 'restrict_violation',
  'not_null_violation' = 'not_null_violation',
  'foreign_key_violation' = 'foreign_key_violation',
  'unique_violation' = 'unique_violation',
  'check_violation' = 'check_violation',
  'exclusion_violation' = 'exclusion_violation',
  'invalid_cursor_state' = 'invalid_cursor_state',
  'invalid_transaction_state' = 'invalid_transaction_state',
  'active_sql_transaction' = 'active_sql_transaction',
  'branch_transaction_already_active' = 'branch_transaction_already_active',
  'held_cursor_requires_same_isolation_level' = 'held_cursor_requires_same_isolation_level',
  'inappropriate_access_mode_for_branch_transaction' = 'inappropriate_access_mode_for_branch_transaction',
  'inappropriate_isolation_level_for_branch_transaction' = 'inappropriate_isolation_level_for_branch_transaction',
  'no_active_sql_transaction_for_branch_transaction' = 'no_active_sql_transaction_for_branch_transaction',
  'read_only_sql_transaction' = 'read_only_sql_transaction',
  'schema_and_data_statement_mixing_not_supported' = 'schema_and_data_statement_mixing_not_supported',
  'no_active_sql_transaction' = 'no_active_sql_transaction',
  'in_failed_sql_transaction' = 'in_failed_sql_transaction',
  'idle_in_transaction_session_timeout' = 'idle_in_transaction_session_timeout',
  'invalid_sql_statement_name' = 'invalid_sql_statement_name',
  'triggered_data_change_violation' = 'triggered_data_change_violation',
  'invalid_authorization_specification' = 'invalid_authorization_specification',
  'invalid_password' = 'invalid_password',
  'dependent_privilege_descriptors_still_exist' = 'dependent_privilege_descriptors_still_exist',
  'dependent_objects_still_exist' = 'dependent_objects_still_exist',
  'invalid_transaction_termination' = 'invalid_transaction_termination',
  'sql_routine_exception' = 'sql_routine_exception',
  'function_executed_no_return_statement' = 'function_executed_no_return_statement',
  'modifying_sql_data_not_permitted' = 'modifying_sql_data_not_permitted',
  'prohibited_sql_statement_attempted' = 'prohibited_sql_statement_attempted',
  'reading_sql_data_not_permitted' = 'reading_sql_data_not_permitted',
  'invalid_cursor_name' = 'invalid_cursor_name',
  'external_routine_exception' = 'external_routine_exception',
  'containing_sql_not_permitted' = 'containing_sql_not_permitted',
  //'modifying_sql_data_not_permitted' = 'modifying_sql_data_not_permitted',
  //'prohibited_sql_statement_attempted' = 'prohibited_sql_statement_attempted',
  //'reading_sql_data_not_permitted' = 'reading_sql_data_not_permitted',
  'external_routine_invocation_exception' = 'external_routine_invocation_exception',
  'invalid_sqlstate_returned' = 'invalid_sqlstate_returned',
  //'null_value_not_allowed' = 'null_value_not_allowed',
  'trigger_protocol_violated' = 'trigger_protocol_violated',
  'srf_protocol_violated' = 'srf_protocol_violated',
  'event_trigger_protocol_violated' = 'event_trigger_protocol_violated',
  'savepoint_exception' = 'savepoint_exception',
  'invalid_savepoint_specification' = 'invalid_savepoint_specification',
  'invalid_catalog_name' = 'invalid_catalog_name',
  'invalid_schema_name' = 'invalid_schema_name',
  'transaction_rollback' = 'transaction_rollback',
  'transaction_integrity_constraint_violation' = 'transaction_integrity_constraint_violation',
  'serialization_failure' = 'serialization_failure',
  'statement_completion_unknown' = 'statement_completion_unknown',
  'deadlock_detected' = 'deadlock_detected',
  'syntax_error_or_access_rule_violation' = 'syntax_error_or_access_rule_violation',
  'syntax_error' = 'syntax_error',
  'insufficient_privilege' = 'insufficient_privilege',
  'cannot_coerce' = 'cannot_coerce',
  'grouping_error' = 'grouping_error',
  'windowing_error' = 'windowing_error',
  'invalid_recursion' = 'invalid_recursion',
  'invalid_foreign_key' = 'invalid_foreign_key',
  'invalid_name' = 'invalid_name',
  'name_too_long' = 'name_too_long',
  'reserved_name' = 'reserved_name',
  'datatype_mismatch' = 'datatype_mismatch',
  'indeterminate_datatype' = 'indeterminate_datatype',
  'collation_mismatch' = 'collation_mismatch',
  'indeterminate_collation' = 'indeterminate_collation',
  'wrong_object_type' = 'wrong_object_type',
  'generated_always' = 'generated_always',
  'undefined_column' = 'undefined_column',
  'undefined_function' = 'undefined_function',
  'undefined_table' = 'undefined_table',
  'undefined_parameter' = 'undefined_parameter',
  'undefined_object' = 'undefined_object',
  'duplicate_column' = 'duplicate_column',
  'duplicate_cursor' = 'duplicate_cursor',
  'duplicate_database' = 'duplicate_database',
  'duplicate_function' = 'duplicate_function',
  'duplicate_prepared_statement' = 'duplicate_prepared_statement',
  'duplicate_schema' = 'duplicate_schema',
  'duplicate_table' = 'duplicate_table',
  'duplicate_alias' = 'duplicate_alias',
  'duplicate_object' = 'duplicate_object',
  'ambiguous_column' = 'ambiguous_column',
  'ambiguous_function' = 'ambiguous_function',
  'ambiguous_parameter' = 'ambiguous_parameter',
  'ambiguous_alias' = 'ambiguous_alias',
  'invalid_column_reference' = 'invalid_column_reference',
  'invalid_column_definition' = 'invalid_column_definition',
  'invalid_cursor_definition' = 'invalid_cursor_definition',
  'invalid_database_definition' = 'invalid_database_definition',
  'invalid_function_definition' = 'invalid_function_definition',
  'invalid_prepared_statement_definition' = 'invalid_prepared_statement_definition',
  'invalid_schema_definition' = 'invalid_schema_definition',
  'invalid_table_definition' = 'invalid_table_definition',
  'invalid_object_definition' = 'invalid_object_definition',
  'with_check_option_violation' = 'with_check_option_violation',
  'insufficient_resources' = 'insufficient_resources',
  'disk_full' = 'disk_full',
  'out_of_memory' = 'out_of_memory',
  'too_many_connections' = 'too_many_connections',
  'configuration_limit_exceeded' = 'configuration_limit_exceeded',
  'program_limit_exceeded' = 'program_limit_exceeded',
  'statement_too_complex' = 'statement_too_complex',
  'too_many_columns' = 'too_many_columns',
  'too_many_arguments' = 'too_many_arguments',
  'object_not_in_prerequisite_state' = 'object_not_in_prerequisite_state',
  'object_in_use' = 'object_in_use',
  'cant_change_runtime_param' = 'cant_change_runtime_param',
  'lock_not_available' = 'lock_not_available',
  'unsafe_new_enum_value_usage' = 'unsafe_new_enum_value_usage',
  'operator_intervention' = 'operator_intervention',
  'query_canceled' = 'query_canceled',
  'admin_shutdown' = 'admin_shutdown',
  'crash_shutdown' = 'crash_shutdown',
  'cannot_connect_now' = 'cannot_connect_now',
  'database_dropped' = 'database_dropped',
  'system_error' = 'system_error',
  'io_error' = 'io_error',
  'undefined_file' = 'undefined_file',
  'duplicate_file' = 'duplicate_file',
  'snapshot_too_old' = 'snapshot_too_old',
  'config_file_error' = 'config_file_error',
  'lock_file_exists' = 'lock_file_exists',
  'fdw_error' = 'fdw_error',
  'fdw_column_name_not_found' = 'fdw_column_name_not_found',
  'fdw_dynamic_parameter_value_needed' = 'fdw_dynamic_parameter_value_needed',
  'fdw_function_sequence_error' = 'fdw_function_sequence_error',
  'fdw_inconsistent_descriptor_information' = 'fdw_inconsistent_descriptor_information',
  'fdw_invalid_attribute_value' = 'fdw_invalid_attribute_value',
  'fdw_invalid_column_name' = 'fdw_invalid_column_name',
  'fdw_invalid_column_number' = 'fdw_invalid_column_number',
  'fdw_invalid_data_type' = 'fdw_invalid_data_type',
  'fdw_invalid_data_type_descriptors' = 'fdw_invalid_data_type_descriptors',
  'fdw_invalid_descriptor_field_identifier' = 'fdw_invalid_descriptor_field_identifier',
  'fdw_invalid_handle' = 'fdw_invalid_handle',
  'fdw_invalid_option_index' = 'fdw_invalid_option_index',
  'fdw_invalid_option_name' = 'fdw_invalid_option_name',
  'fdw_invalid_string_length_or_buffer_length' = 'fdw_invalid_string_length_or_buffer_length',
  'fdw_invalid_string_format' = 'fdw_invalid_string_format',
  'fdw_invalid_use_of_null_pointer' = 'fdw_invalid_use_of_null_pointer',
  'fdw_too_many_handles' = 'fdw_too_many_handles',
  'fdw_out_of_memory' = 'fdw_out_of_memory',
  'fdw_no_schemas' = 'fdw_no_schemas',
  'fdw_option_name_not_found' = 'fdw_option_name_not_found',
  'fdw_reply_handle' = 'fdw_reply_handle',
  'fdw_schema_not_found' = 'fdw_schema_not_found',
  'fdw_table_not_found' = 'fdw_table_not_found',
  'fdw_unable_to_create_execution' = 'fdw_unable_to_create_execution',
  'fdw_unable_to_create_reply' = 'fdw_unable_to_create_reply',
  'fdw_unable_to_establish_connection' = 'fdw_unable_to_establish_connection',
  'plpgsql_error' = 'plpgsql_error',
  'raise_exception' = 'raise_exception',
  'no_data_found' = 'no_data_found',
  'too_many_rows' = 'too_many_rows',
  'assert_failure' = 'assert_failure',
  'internal_error' = 'internal_error',
  'data_corrupted' = 'data_corrupted',
  'index_corrupted' = 'index_corrupted',
}

const psqlErrorCodeDict: Record<string, PGCodeCondition> = {
  // Class 00 — Successful Completion
  '00000': PGCodeCondition.successful_completion,
  
  // Class 01 — Warning
  '01000': PGCodeCondition.warning,
  '0100C': PGCodeCondition.dynamic_result_sets_returned,
  '01008': PGCodeCondition.implicit_zero_bit_padding,
  '01003': PGCodeCondition.null_value_eliminated_in_set_function,
  '01007': PGCodeCondition.privilege_not_granted,
  '01006': PGCodeCondition.privilege_not_revoked,
  '01004': PGCodeCondition.string_data_right_truncation,
  '01P01': PGCodeCondition.deprecated_feature,
  
  // Class 02 — No Data (this is also a warning class per the SQL standard)
  '02000': PGCodeCondition.no_data,
  '02001': PGCodeCondition.no_additional_dynamic_result_sets_returned,
  
  // Class 03 — SQL Statement Not Yet Complete
  '03000': PGCodeCondition.sql_statement_not_yet_complete,
  
  // Class 08 — Connection Exception
  '08000': PGCodeCondition.connection_exception,
  '08003': PGCodeCondition.connection_does_not_exist,
  '08006': PGCodeCondition.connection_failure,
  '08001': PGCodeCondition.sqlclient_unable_to_establish_sqlconnection,
  '08004': PGCodeCondition.sqlserver_rejected_establishment_of_sqlconnection,
  '08007': PGCodeCondition.transaction_resolution_unknown,
  '08P01': PGCodeCondition.protocol_violation,
  
  // Class 09 — Triggered Action Exception
  '09000': PGCodeCondition.triggered_action_exception,
  
  // Class 0A — Feature Not Supported
  '0A000': PGCodeCondition.feature_not_supported,
  
  // Class 0B — Invalid Transaction Initiation
  '0B000': PGCodeCondition.invalid_transaction_initiation,
  
  // Class 0F — Locator Exception
  '0F000': PGCodeCondition.locator_exception,
  '0F001': PGCodeCondition.invalid_locator_specification,
  
  // Class 0L — Invalid Grantor
  '0L000': PGCodeCondition.invalid_grantor,
  '0LP01': PGCodeCondition.invalid_grant_operation,
  
  // Class 0P — Invalid Role Specification
  '0P000': PGCodeCondition.invalid_role_specification,
  
  // Class 0Z — Diagnostics Exception
  '0Z000': PGCodeCondition.diagnostics_exception,
  '0Z002': PGCodeCondition.stacked_diagnostics_accessed_without_active_handler,
  
  // Class 20 — Case Not Found
  '20000': PGCodeCondition.case_not_found,
  
  // Class 21 — Cardinality Violation
  '21000': PGCodeCondition.cardinality_violation,
  
  // Class 22 — Data Exception
  '22000': PGCodeCondition.data_exception,
  '2202E': PGCodeCondition.array_subscript_error,
  '22021': PGCodeCondition.character_not_in_repertoire,
  '22008': PGCodeCondition.datetime_field_overflow,
  '22012': PGCodeCondition.division_by_zero,
  '22005': PGCodeCondition.error_in_assignment,
  '2200B': PGCodeCondition.escape_character_conflict,
  '22022': PGCodeCondition.indicator_overflow,
  '22015': PGCodeCondition.interval_field_overflow,
  '2201E': PGCodeCondition.invalid_argument_for_logarithm,
  '22014': PGCodeCondition.invalid_argument_for_ntile_function,
  '22016': PGCodeCondition.invalid_argument_for_nth_value_function,
  '2201F': PGCodeCondition.invalid_argument_for_power_function,
  '2201G': PGCodeCondition.invalid_argument_for_width_bucket_function,
  '22018': PGCodeCondition.invalid_character_value_for_cast,
  '22007': PGCodeCondition.invalid_datetime_format,
  '22019': PGCodeCondition.invalid_escape_character,
  '2200D': PGCodeCondition.invalid_escape_octet,
  '22025': PGCodeCondition.invalid_escape_sequence,
  '22P06': PGCodeCondition.nonstandard_use_of_escape_character,
  '22010': PGCodeCondition.invalid_indicator_parameter_value,
  '22023': PGCodeCondition.invalid_parameter_value,
  '22013': PGCodeCondition.invalid_preceding_or_following_size,
  '2201B': PGCodeCondition.invalid_regular_expression,
  '2201W': PGCodeCondition.invalid_row_count_in_limit_clause,
  '2201X': PGCodeCondition.invalid_row_count_in_result_offset_clause,
  '2202H': PGCodeCondition.invalid_tablesample_argument,
  '2202G': PGCodeCondition.invalid_tablesample_repeat,
  '22009': PGCodeCondition.invalid_time_zone_displacement_value,
  '2200C': PGCodeCondition.invalid_use_of_escape_character,
  '2200G': PGCodeCondition.most_specific_type_mismatch,
  '22004': PGCodeCondition.null_value_not_allowed,
  '22002': PGCodeCondition.null_value_no_indicator_parameter,
  '22003': PGCodeCondition.numeric_value_out_of_range,
  '2200H': PGCodeCondition.sequence_generator_limit_exceeded,
  '22026': PGCodeCondition.string_data_length_mismatch,
  '22001': PGCodeCondition.string_data_right_truncation,
  '22011': PGCodeCondition.substring_error,
  '22027': PGCodeCondition.trim_error,
  '22024': PGCodeCondition.unterminated_c_string,
  '2200F': PGCodeCondition.zero_length_character_string,
  '22P01': PGCodeCondition.floating_point_exception,
  '22P02': PGCodeCondition.invalid_text_representation,
  '22P03': PGCodeCondition.invalid_binary_representation,
  '22P04': PGCodeCondition.bad_copy_file_format,
  '22P05': PGCodeCondition.untranslatable_character,
  '2200L': PGCodeCondition.not_an_xml_document,
  '2200M': PGCodeCondition.invalid_xml_document,
  '2200N': PGCodeCondition.invalid_xml_content,
  '2200S': PGCodeCondition.invalid_xml_comment,
  '2200T': PGCodeCondition.invalid_xml_processing_instruction,
  '22030': PGCodeCondition.duplicate_json_object_key_value,
  '22031': PGCodeCondition.invalid_argument_for_sql_json_datetime_function,
  '22032': PGCodeCondition.invalid_json_text,
  '22033': PGCodeCondition.invalid_sql_json_subscript,
  '22034': PGCodeCondition.more_than_one_sql_json_item,
  '22035': PGCodeCondition.no_sql_json_item,
  '22036': PGCodeCondition.non_numeric_sql_json_item,
  '22037': PGCodeCondition.non_unique_keys_in_a_json_object,
  '22038': PGCodeCondition.singleton_sql_json_item_required,
  '22039': PGCodeCondition.sql_json_array_not_found,
  '2203A': PGCodeCondition.sql_json_member_not_found,
  '2203B': PGCodeCondition.sql_json_number_not_found,
  '2203C': PGCodeCondition.sql_json_object_not_found,
  '2203D': PGCodeCondition.too_many_json_array_elements,
  '2203E': PGCodeCondition.too_many_json_object_members,
  '2203F': PGCodeCondition.sql_json_scalar_required,
  
  // Class 23 — Integrity Constraint Violation
  '23000': PGCodeCondition.integrity_constraint_violation,
  '23001': PGCodeCondition.restrict_violation,
  '23502': PGCodeCondition.not_null_violation,
  '23503': PGCodeCondition.foreign_key_violation,
  '23505': PGCodeCondition.unique_violation,
  '23514': PGCodeCondition.check_violation,
  '23P01': PGCodeCondition.exclusion_violation,
  
  // Class 24 — Invalid Cursor State
  '24000': PGCodeCondition.invalid_cursor_state,
  
  // Class 25 — Invalid Transaction State
  '25000': PGCodeCondition.invalid_transaction_state,
  '25001': PGCodeCondition.active_sql_transaction,
  '25002': PGCodeCondition.branch_transaction_already_active,
  '25008': PGCodeCondition.held_cursor_requires_same_isolation_level,
  '25003': PGCodeCondition.inappropriate_access_mode_for_branch_transaction,
  '25004': PGCodeCondition.inappropriate_isolation_level_for_branch_transaction,
  '25005': PGCodeCondition.no_active_sql_transaction_for_branch_transaction,
  '25006': PGCodeCondition.read_only_sql_transaction,
  '25007': PGCodeCondition.schema_and_data_statement_mixing_not_supported,
  '25P01': PGCodeCondition.no_active_sql_transaction,
  '25P02': PGCodeCondition.in_failed_sql_transaction,
  '25P03': PGCodeCondition.idle_in_transaction_session_timeout,
  
  // Class 26 — Invalid SQL Statement Name
  '26000': PGCodeCondition.invalid_sql_statement_name,
  
  // Class 27 — Triggered Data Change Violation
  '27000': PGCodeCondition.triggered_data_change_violation,
  
  // Class 28 — Invalid Authorization Specification
  '28000': PGCodeCondition.invalid_authorization_specification,
  '28P01': PGCodeCondition.invalid_password,
  
  // Class 2B — Dependent Privilege Descriptors Still Exist
  '2B000': PGCodeCondition.dependent_privilege_descriptors_still_exist,
  '2BP01': PGCodeCondition.dependent_objects_still_exist,
  
  // Class 2D — Invalid Transaction Termination
  '2D000': PGCodeCondition.invalid_transaction_termination,
  
  // Class 2F — SQL Routine Exception
  '2F000': PGCodeCondition.sql_routine_exception,
  '2F005': PGCodeCondition.function_executed_no_return_statement,
  '2F002': PGCodeCondition.modifying_sql_data_not_permitted,
  '2F003': PGCodeCondition.prohibited_sql_statement_attempted,
  '2F004': PGCodeCondition.reading_sql_data_not_permitted,
  
  // Class 34 — Invalid Cursor Name
  '34000': PGCodeCondition.invalid_cursor_name,
  
  // Class 38 — External Routine Exception
  '38000': PGCodeCondition.external_routine_exception,
  '38001': PGCodeCondition.containing_sql_not_permitted,
  '38002': PGCodeCondition.modifying_sql_data_not_permitted,
  '38003': PGCodeCondition.prohibited_sql_statement_attempted,
  '38004': PGCodeCondition.reading_sql_data_not_permitted,
  
  // Class 39 — External Routine Invocation Exception
  '39000': PGCodeCondition.external_routine_invocation_exception,
  '39001': PGCodeCondition.invalid_sqlstate_returned,
  '39004': PGCodeCondition.null_value_not_allowed,
  '39P01': PGCodeCondition.trigger_protocol_violated,
  '39P02': PGCodeCondition.srf_protocol_violated,
  '39P03': PGCodeCondition.event_trigger_protocol_violated,
  
  // Class 3B — Savepoint Exception
  '3B000': PGCodeCondition.savepoint_exception,
  '3B001': PGCodeCondition.invalid_savepoint_specification,
  
  // Class 3D — Invalid Catalog Name
  '3D000': PGCodeCondition.invalid_catalog_name,
  
  // Class 3F — Invalid Schema Name
  '3F000': PGCodeCondition.invalid_schema_name,
  
  // Class 40 — Transaction Rollback
  '40000': PGCodeCondition.transaction_rollback,
  '40002': PGCodeCondition.transaction_integrity_constraint_violation,
  '40001': PGCodeCondition.serialization_failure,
  '40003': PGCodeCondition.statement_completion_unknown,
  '40P01': PGCodeCondition.deadlock_detected,
  
  // Class 42 — Syntax Error or Access Rule Violation
  '42000': PGCodeCondition.syntax_error_or_access_rule_violation,
  '42601': PGCodeCondition.syntax_error,
  '42501': PGCodeCondition.insufficient_privilege,
  '42846': PGCodeCondition.cannot_coerce,
  '42803': PGCodeCondition.grouping_error,
  '42P20': PGCodeCondition.windowing_error,
  '42P19': PGCodeCondition.invalid_recursion,
  '42830': PGCodeCondition.invalid_foreign_key,
  '42602': PGCodeCondition.invalid_name,
  '42622': PGCodeCondition.name_too_long,
  '42939': PGCodeCondition.reserved_name,
  '42804': PGCodeCondition.datatype_mismatch,
  '42P18': PGCodeCondition.indeterminate_datatype,
  '42P21': PGCodeCondition.collation_mismatch,
  '42P22': PGCodeCondition.indeterminate_collation,
  '42809': PGCodeCondition.wrong_object_type,
  '428C9': PGCodeCondition.generated_always,
  '42703': PGCodeCondition.undefined_column,
  '42883': PGCodeCondition.undefined_function,
  '42P01': PGCodeCondition.undefined_table,
  '42P02': PGCodeCondition.undefined_parameter,
  '42704': PGCodeCondition.undefined_object,
  '42701': PGCodeCondition.duplicate_column,
  '42P03': PGCodeCondition.duplicate_cursor,
  '42P04': PGCodeCondition.duplicate_database,
  '42723': PGCodeCondition.duplicate_function,
  '42P05': PGCodeCondition.duplicate_prepared_statement,
  '42P06': PGCodeCondition.duplicate_schema,
  '42P07': PGCodeCondition.duplicate_table,
  '42712': PGCodeCondition.duplicate_alias,
  '42710': PGCodeCondition.duplicate_object,
  '42702': PGCodeCondition.ambiguous_column,
  '42725': PGCodeCondition.ambiguous_function,
  '42P08': PGCodeCondition.ambiguous_parameter,
  '42P09': PGCodeCondition.ambiguous_alias,
  '42P10': PGCodeCondition.invalid_column_reference,
  '42611': PGCodeCondition.invalid_column_definition,
  '42P11': PGCodeCondition.invalid_cursor_definition,
  '42P12': PGCodeCondition.invalid_database_definition,
  '42P13': PGCodeCondition.invalid_function_definition,
  '42P14': PGCodeCondition.invalid_prepared_statement_definition,
  '42P15': PGCodeCondition.invalid_schema_definition,
  '42P16': PGCodeCondition.invalid_table_definition,
  '42P17': PGCodeCondition.invalid_object_definition,
  
  // Class 44 — WITH CHECK OPTION Violation
  '44000': PGCodeCondition.with_check_option_violation,
  
  // Class 53 — Insufficient Resources
  '53000': PGCodeCondition.insufficient_resources,
  '53100': PGCodeCondition.disk_full,
  '53200': PGCodeCondition.out_of_memory,
  '53300': PGCodeCondition.too_many_connections,
  '53400': PGCodeCondition.configuration_limit_exceeded,
  
  // Class 54 — Program Limit Exceeded
  '54000': PGCodeCondition.program_limit_exceeded,
  '54001': PGCodeCondition.statement_too_complex,
  '54011': PGCodeCondition.too_many_columns,
  '54023': PGCodeCondition.too_many_arguments,
  
  // Class 55 — Object Not In Prerequisite State
  '55000': PGCodeCondition.object_not_in_prerequisite_state,
  '55006': PGCodeCondition.object_in_use,
  '55P02': PGCodeCondition.cant_change_runtime_param,
  '55P03': PGCodeCondition.lock_not_available,
  '55P04': PGCodeCondition.unsafe_new_enum_value_usage,
  
  // Class 57 — Operator Intervention
  '57000': PGCodeCondition.operator_intervention,
  '57014': PGCodeCondition.query_canceled,
  '57P01': PGCodeCondition.admin_shutdown,
  '57P02': PGCodeCondition.crash_shutdown,
  '57P03': PGCodeCondition.cannot_connect_now,
  '57P04': PGCodeCondition.database_dropped,
  
  // Class 58 — System Error (errors external to PostgreSQL itself)
  '58000': PGCodeCondition.system_error,
  '58030': PGCodeCondition.io_error,
  '58P01': PGCodeCondition.undefined_file,
  '58P02': PGCodeCondition.duplicate_file,
  
  // Class 72 — Snapshot Failure
  '72000': PGCodeCondition.snapshot_too_old,
  
  // Class F0 — Configuration File Error
  'F0000': PGCodeCondition.config_file_error,
  'F0001': PGCodeCondition.lock_file_exists,
  
  // Class HV — Foreign Data Wrapper Error (SQL/MED)
  'HV000': PGCodeCondition.fdw_error,
  'HV005': PGCodeCondition.fdw_column_name_not_found,
  'HV002': PGCodeCondition.fdw_dynamic_parameter_value_needed,
  'HV010': PGCodeCondition.fdw_function_sequence_error,
  'HV021': PGCodeCondition.fdw_inconsistent_descriptor_information,
  'HV024': PGCodeCondition.fdw_invalid_attribute_value,
  'HV007': PGCodeCondition.fdw_invalid_column_name,
  'HV008': PGCodeCondition.fdw_invalid_column_number,
  'HV004': PGCodeCondition.fdw_invalid_data_type,
  'HV006': PGCodeCondition.fdw_invalid_data_type_descriptors,
  'HV091': PGCodeCondition.fdw_invalid_descriptor_field_identifier,
  'HV00B': PGCodeCondition.fdw_invalid_handle,
  'HV00C': PGCodeCondition.fdw_invalid_option_index,
  'HV00D': PGCodeCondition.fdw_invalid_option_name,
  'HV090': PGCodeCondition.fdw_invalid_string_length_or_buffer_length,
  'HV00A': PGCodeCondition.fdw_invalid_string_format,
  'HV009': PGCodeCondition.fdw_invalid_use_of_null_pointer,
  'HV014': PGCodeCondition.fdw_too_many_handles,
  'HV001': PGCodeCondition.fdw_out_of_memory,
  'HV00P': PGCodeCondition.fdw_no_schemas,
  'HV00J': PGCodeCondition.fdw_option_name_not_found,
  'HV00K': PGCodeCondition.fdw_reply_handle,
  'HV00Q': PGCodeCondition.fdw_schema_not_found,
  'HV00R': PGCodeCondition.fdw_table_not_found,
  'HV00L': PGCodeCondition.fdw_unable_to_create_execution,
  'HV00M': PGCodeCondition.fdw_unable_to_create_reply,
  'HV00N': PGCodeCondition.fdw_unable_to_establish_connection,
  
  // Class P0 — PL/pgSQL Error
  'P0000': PGCodeCondition.plpgsql_error,
  'P0001': PGCodeCondition.raise_exception,
  'P0002': PGCodeCondition.no_data_found,
  'P0003': PGCodeCondition.too_many_rows,
  'P0004': PGCodeCondition.assert_failure,
  
  // Class XX — Internal Error
  'XX000': PGCodeCondition.internal_error,
  'XX001': PGCodeCondition.data_corrupted,
  'XX002': PGCodeCondition.index_corrupted,
};
export default psqlErrorCodeDict;