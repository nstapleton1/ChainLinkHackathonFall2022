from scripts.helpful_scripts import LOCAL_BLOCKCHAIN_ENVIRONMENTS, get_account
from scripts.deploy import deploy_quiz
from brownie import network, accounts, exceptions
import pytest

def test_quiz():
    account = get_account()
    quiz = deploy_quiz()
    
    # can get correct fee
    print("Test1: get fee")
    game_fee = quiz.getGamePrice() + 100
    assert game_fee > 10000.000075 # approx as at 16/Nov

    #check starting balance is 0
    print("check starting balance")
    bal = quiz.getBalance()
    assert bal == 0
    
    #can accept payment of fee
    # print("Test2: test pay")
    # start_contract_balance = quiz.getBalance()
    # tx = quiz.payToPlay({"from": account, "value": game_fee})
    # tx.wait(1)
    # assert quiz.getBalance() == game_fee + start_contract_balance

    # tx2 = quiz.withdraw({"from":account})
    # tx2.wait(1)
    # assert quiz.getBalance() == 0

    # #set high score
    # tx3 = quiz.setHighScore(5,{"from":account})
    # tx3.wait(1)
    # assert quiz.walletToHighScore[0] == 5

# def test_only_owner_can_withdraw():
#     pass
    # if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
    #     pytest.skip("only for local testing")
    # fund_me = deploy_fund_me()
    # bad_actor = accounts.add()
    # with pytest.raises(exceptions.VirtualMachineError):
    #     fund_me.withdraw({"from": bad_actor})