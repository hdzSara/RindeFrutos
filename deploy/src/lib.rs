#[dependencies]
solana-program = { version = "1.9.3" }
spl-token = { version = "3.3.2" , features = ["fixed-point"] }  


use anchor_lang::prelude::*;

declare_id!("3oHznaaGzwAcyQE8URryZGbqNBJorEjbqE6aLZBWUvZ1");

use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};
use std::convert::TryInto;

// Definimos las estructuras para representar nuestros datos
#[derive(Clone, Debug)]
pub struct User {
    pub email: String,
    pub password_hash: [u8; 32],
    pub name: String,
    pub last_name: String,
    pub address: String,
    pub city: String,
    pub solana_wallet: Pubkey,
}

#[derive(Clone, Debug)]
pub struct SupportInfo {
    pub crop_type: String,
    pub support_amount: u64,
    pub budget: u64,
    pub property: String,
}

#[entrypoint]
pub fn initialize(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    input: &[u8],
) -> ProgramResult {
    // Aquí iría la lógica de inicialización
    Ok(())
}

pub fn register_user(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    email: String,
    password_hash: [u8; 32],
    name: String,
    last_name: String,
    address: String,
    city: String,
    solana_wallet: Pubkey,
) -> ProgramResult {
    let mut accounts_iter = accounts.iter();
    let user_account = accounts_iter.next().unwrap();
    
    // Verificar si el usuario existe
    if user_account.data.is_empty() {
        // Crear nuevo usuario
        let user = User {
            email,
            password_hash,
            name,
            last_name,
            address,
            city,
            solana_wallet,
        };
        
        // Aquí iría la lógica para guardar el usuario en el estado del contrato
        msg!("Usuario registrado correctamente");
        Ok(())
    } else {
        Err(ProgramError::AccountAlreadyInitialized)
    }
}

pub fn update_support_info(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    crop_type: String,
    support_amount: u64,
    budget: u64,
    property: String,
) -> ProgramResult {
    let mut accounts_iter = accounts.iter();
    let user_account = accounts_iter.next().unwrap();
    
    // Aquí iría la lógica para actualizar la información de apoyo
    msg!("Información de apoyo actualizada");
    Ok(())
}

pub fn get_beneficiary_info(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    beneficiary_email: String,
) -> ProgramResult {
    let mut accounts_iter = accounts.iter();
    let user_account = accounts_iter.next().unwrap();
    
    // Aquí iría la lógica para consultar la información del beneficiario
    // Podríamos usar SolScan aquí para obtener información sobre transacciones
    
    msg!("Información del beneficiario obtenida");
    Ok(())
}
