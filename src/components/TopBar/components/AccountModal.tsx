import React, {useCallback} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import {getSushiAddress} from '../../../sushi/utils'
import {getBalanceNumber} from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, {ModalProps} from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'

const AccountModal: React.FC<ModalProps> = ({onDismiss}) => {
    const {account, reset} = useWallet()

    const handleSignOutClick = useCallback(() => {
      onDismiss!()
      window.localStorage.removeItem('accountStatus')
      reset()
    }, [onDismiss, reset])

    const sushi = useSushi()
    const sushiBalance = useTokenBalance(getSushiAddress(sushi))

    return (
        <Modal>
            <ModalContent>
                <Spacer/>
                <div style={{display: 'flex'}}>
                    <StyledBalanceWrapper>
                        <StyledBalance>
                            <Value value={getBalanceNumber(sushiBalance)}/>
                            <Label text="TIN Balance"/>
                        </StyledBalance>
                    </StyledBalanceWrapper>
                </div>

                <Spacer/>
                <StyledButtons>
                  <Button
                      href={`https://bscscan.com/address/${account}`}
                      text="View on BscScan"
                      variant="secondary"
                  />
                  <Spacer/>
                  <Button
                      onClick={handleSignOutClick}
                      text="Sign out"
                      variant="secondary"
                  />
                </StyledButtons>
            </ModalContent>
        </Modal>
    )
}

const StyledButtons = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
