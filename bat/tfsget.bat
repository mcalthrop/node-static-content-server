@echo off

rem -------------------------------------------------------------------------------------
rem
rem     USAGE
rem         tfsget <TFS_SOURCE_PATH> <CHECKOUT_DEST_DIR>
rem
rem     EXAMPLE
rem         tfsget '$/src/business/v1.0/js' C:/src/business/v1.0/js
rem
rem -------------------------------------------------------------------------------------

rem *** Set up environment variables & prompt
set PATH=%PATH%;"C:\Program Files (x86)\Microsoft Visual Studio 10.0\Common7\IDE"
set TFS_SOURCE_PATH=%1
set CHECKOUT_DEST_DIR=%2
prompt $g$g

rem *** check parameters we have been passed in
if "%TFS_SOURCE_PATH%"=="" goto source_path_empty
if "%CHECKOUT_DEST_DIR%"=="" goto checkout_dest_dir_empty
if not exist %CHECKOUT_DEST_DIR% goto checkout_dest_dir_not_exists

rem *** execute the tf get
cd %CHECKOUT_DEST_DIR%
cd
@echo on
tf get /recursive %TFS_SOURCE_PATH%
@goto :end

:source_path_empty
@echo ERROR: need TFS_SOURCE_PATH
@goto usage

:checkout_dest_dir_empty
@echo ERROR: need CHECKOUT_DEST_DIR
@goto usage

:checkout_dest_dir_not_exists
@echo ERROR: CHECKOUT_DEST_DIR does not exist: %CHECKOUT_DEST_DIR%
@goto usage

:usage
@echo USAGE: tfsget TFS_SOURCE_PATH CHECKOUT_DEST_DIR
@echo EXAMPLE: tfsget '$/src/business/v1.0/js' C:/src/business/v1.0/js
@exit /b 99

:end