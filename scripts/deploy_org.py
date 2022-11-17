from brownie import accounts, config, Quiz, network
import time


def deploy_simple_storage():
    account=accounts[0]
    # account = getAccount()
    print(account)
    quiz = Quiz.deploy({"from":account})
    # transaction = helloWorldObject.setName("Michael", {"from": account})
    # qs = quiz.getSample()
    # time.sleep(1)
    # print(qs)
    qs2 = quiz.getQuestionArray()
    time.sleep(1)
    print(qs2)
    
    # stored_value = simple_storage.retrieve()
    # print(stored_value)
    # transaction = simple_storage.store(15, {"from":account})
    # transaction.wait(1)
    # updated_stored_value = simple_storage.retrieve()
    # print(updated_stored_value)
        
# def getAccount():
#     if network.show_active() == "development":
#         return accounts[0]
#     else:
#         return accounts.add(config["wallets"]["from_key"])

def main():
    print("Starting main...")
    deploy_simple_storage()